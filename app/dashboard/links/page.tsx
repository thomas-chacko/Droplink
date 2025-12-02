'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Link as LinkIcon, GripVertical, Globe, ExternalLink, Search } from 'lucide-react';
import { useLinkStore } from '@/store/useLinkStore';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';

type LinkItem = {
  _id: string;
  title: string;
  url: string;
  isActive: boolean;
  order?: number;
  description?: string;
  icon?: string;
};

export default function LinksPage() {
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; linkId: string | null }>({
    isOpen: false,
    linkId: null
  });

  const { isLoading, error, fetchLinks, links, addLink, updateLink, deleteLink } = useLinkStore()
  console.log(links);

  useEffect(() => {
    fetchLinks()
  }, []);

  const handleSubmit = async () => {
    if (newLink.title && newLink.url) {
      if (editingId) {
        const linkToUpdate = links.find(l => l._id === editingId);
        if (linkToUpdate) {
          await updateLink({
            ...linkToUpdate,
            title: newLink.title,
            url: newLink.url
          });
        }
        setEditingId(null);
      } else {
        await addLink({
          title: newLink.title,
          url: newLink.url,
          isActive: true
        });
      }
      setNewLink({ title: '', url: '' });
    }
  };

  const handleEdit = (link: LinkItem) => {
    setEditingId(link._id);
    setNewLink({ title: link.title, url: link.url });
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewLink({ title: '', url: '' });
  };

  const handleDeleteClick = (id: string) => {
    setDeleteModal({ isOpen: true, linkId: id });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.linkId) {
      await deleteLink(deleteModal.linkId);
      if (editingId === deleteModal.linkId) {
        handleCancelEdit();
      }
      setDeleteModal({ isOpen: false, linkId: null });
    }
  };

  const toggleLink = (id: string) => {
    const link = links.find(l => l._id === id);
    if (link) {
      updateLink({ ...link, isActive: !link.isActive });
    }
  };

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Manage Links</h2>
          <p className="text-slate-400">Add and organize the links displayed on your profile.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#1E293B]/50 border border-white/5 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-64 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Link Card */}
      <div className="bg-[#1E293B]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${editingId ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
              {editingId ? <Edit2 className="w-5 h-5 text-amber-400" /> : <Plus className="w-5 h-5 text-blue-400" />}
            </div>
            <h3 className="text-lg font-semibold text-white">{editingId ? 'Edit Link' : 'Add New Link'}</h3>
          </div>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 ml-1">Link Title</label>
            <div className="relative group">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="e.g. My Portfolio"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-[#0B1120]/50 border border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none text-white placeholder-slate-600 transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 ml-1">Destination URL</label>
            <div className="relative group">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="url"
                placeholder="https://..."
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-[#0B1120]/50 border border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none text-white placeholder-slate-600 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!newLink.title || !newLink.url || isLoading}
            className={`flex items-center gap-2 cursor-pointer px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg font-medium ${editingId
              ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/20'
              : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20'
              }`}
          >
            {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {editingId ? 'Update Link' : 'Add to Profile'}
          </button>
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-semibold text-white">Your Links <span className="text-slate-500 text-sm font-normal ml-2">({links.length})</span></h3>
        </div>

        {isLoading && !links.length ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading links...</p>
          </div>
        ) : links.length === 0 ? (
          <div className="bg-[#1E293B]/30 border border-white/5 rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <LinkIcon className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
            <h3 className="text-white font-medium mb-2">No links yet</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Add your first link above to start building your profile.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLinks.length > 0 ? filteredLinks.map((link) => (
              <div
                key={link._id}
                className={`group flex items-center gap-2 md:gap-4 p-3 md:p-4 bg-[#1E293B]/50 hover:bg-[#1E293B]/80 border border-white/5 rounded-xl transition-all ${!link.isActive ? 'opacity-60' : ''} ${editingId === link._id ? 'ring-2 ring-amber-500/50' : ''}`}
              >
                <button className="cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-400 transition p-1">
                  <GripVertical className="w-5 h-5" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-white truncate">{link.title}</h4>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{link.url}</p>
                </div>

                <div className="flex items-center gap-1 md:gap-2">
                  <div className="flex items-center gap-2 mr-0 md:mr-2">
                    <span className={`hidden md:block text-xs font-medium ${link.isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {link.isActive ? 'Active' : 'Hidden'}
                    </span>
                    <button
                      onClick={() => toggleLink(link._id)}
                      className={`w-10 h-5 cursor-pointer rounded-full transition-colors relative ${link.isActive ? 'bg-emerald-500/20' : 'bg-slate-700'
                        }`}
                    >
                      <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${link.isActive
                        ? 'left-6 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                        : 'left-1 bg-slate-400'
                        }`} />
                    </button>
                  </div>

                  <div className="h-8 w-px bg-white/5 mx-1 md:mx-2" />

                  <button
                    onClick={() => handleEdit(link)}
                    className="p-1.5 md:p-2 cursor-pointer text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(link._id)}
                    className="p-1.5 md:p-2 cursor-pointer text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )) : (
              <p className="text-slate-500 text-sm text-center">No links found.</p>
            )}
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, linkId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Link"
        message="Are you sure you want to delete this link? This action cannot be undone."
        isLoading={isLoading}
      />
    </div>
  );
}
