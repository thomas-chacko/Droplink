import { linkServices } from "@/services/linkServices";
import { create } from "zustand";

interface Link {
    _id: string;
    title: string;
    url: string;
    isActive: boolean;
    icon?: string;
    order?: number;
    description?: string;
}

interface LinkState {
    links: Link[];
    isLoading: boolean;
    error: string | null;
    fetchLinks: () => Promise<void>;
    addLink: (link: Omit<Link, "_id">) => Promise<void>;
    updateLink: (link: Link) => Promise<void>;
    deleteLink: (linkId: string) => Promise<void>;
}

export const useLinkStore = create<LinkState>((set) => ({
    links: [] as Link[],
    isLoading: false,
    error: null,
    fetchLinks: async () => {
        try {
            set({
                isLoading: true,
                error: null
            })
            const response = await linkServices.getAllLinks();
            if (response.success) {
                set({
                    links: response.data
                })
            }
        } catch (error) {
            set({
                error: "Failed to fetch links"
            })
        } finally {
            set({
                isLoading: false
            })
        }
    },
    addLink: async (link: Omit<Link, "_id">) => {
        const { links } = useLinkStore.getState();
        try {
            set({
                isLoading: true,
                error: null
            })
            const response = await linkServices.createLink(link);
            if (response.success) {
                set({
                    links: [...links, response.data]
                })
            }
        } catch (error) {
            set({
                error: "Failed to add link"
            })
        } finally {
            set({
                isLoading: false
            })
        }
    },
    updateLink: async (link: Link) => {
        const { links } = useLinkStore.getState();
        try {
            set({
                isLoading: true,
                error: null
            })
            const response = await linkServices.updateLink(link);
            if (response.success) {
                set({
                    links: links.map((l) => (l._id === link._id ? link : l))
                })
            }
        } catch (error) {
            set({
                error: "Failed to update link"
            })
        } finally {
            set({
                isLoading: false
            })
        }
    },
    deleteLink: async (linkId: string) => {
        const { links } = useLinkStore.getState();
        try {
            set({
                isLoading: true,
                error: null
            })
            const response = await linkServices.deleteLink(linkId);
            if (response.success) {
                set({
                    links: links.filter((l) => l._id !== linkId)
                })
            }
        } catch (error) {
            set({
                error: "Failed to delete link"
            })
        } finally {
            set({
                isLoading: false
            })
        }
    }
}))