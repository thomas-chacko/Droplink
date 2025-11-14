'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, Link as LinkIcon, GripVertical } from 'lucide-react';

type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export default function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([
    { id: '1', title: 'Portfolio', url: 'https://example.com' },
    { id: '2', title: 'Instagram', url: 'https://instagram.com/johndoe' },
    { id: '3', title: 'YouTube', url: 'https://youtube.com/@johndoe' },
  ]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, { id: Date.now().toString(), ...newLink }]);
      setNewLink({ title: '', url: '' });
    }
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">My Links</h1>
        <p className="text-blue-200">Add and manage your links</p>
      </div>

      <div className="space-y-6">
        {/* Add New Link */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">Add New Link</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Link Title (e.g., Instagram)"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-white placeholder-blue-300"
            />
            <input
              type="url"
              placeholder="URL (e.g., https://...)"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-white placeholder-blue-300"
            />
          </div>
          
          <button
            onClick={addLink}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition font-bold"
          >
            <Plus className="w-5 h-5" />
            Add Link
          </button>
        </div>

        {/* Links List */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">Your Links ({links.length})</h2>
          
          {links.length === 0 ? (
            <div className="text-center py-12">
              <LinkIcon className="w-12 h-12 text-blue-300 mx-auto mb-3 opacity-50" />
              <p className="text-blue-200 mb-2">No links yet</p>
              <p className="text-sm text-blue-300">Add your first link above to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((link) => (
                <div key={link.id} className="flex items-center gap-3 p-4 bg-white/5 border border-white/20 rounded-xl hover:border-blue-400 transition group">
                  <button className="cursor-grab active:cursor-grabbing text-blue-300 hover:text-white transition">
                    <GripVertical className="w-5 h-5" />
                  </button>
                  <LinkIcon className="w-5 h-5 text-blue-300 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{link.title}</p>
                    <p className="text-sm text-blue-200 truncate">{link.url}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-blue-300 hover:bg-white/10 rounded-lg transition">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteLink(link.id)}
                      className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
