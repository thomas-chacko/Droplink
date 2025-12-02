import { linkServices } from "@/services/linkServices";
import { create } from "zustand";
import { useToastStore } from "./useToastStore";

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

const validateLink = (link: Partial<Link>) => {
    if (!link.title?.trim()) return "Title is required";
    if (!link.url?.trim()) return "URL is required";
    try {
        new URL(link.url);
    } catch {
        return "Please enter a valid URL (e.g., https://example.com)";
    }
    return null;
};

export const useLinkStore = create<LinkState>((set) => ({
    links: [] as Link[],
    isLoading: false,
    error: null,
    fetchLinks: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await linkServices.getAllLinks();
            if (response.success) {
                set({ links: response.data });
            }
        } catch (error) {
            set({ error: "Failed to fetch links" });
            useToastStore.getState().addToast("Failed to fetch links", "error");
        } finally {
            set({ isLoading: false });
        }
    },
    addLink: async (link: Omit<Link, "_id">) => {
        const validationError = validateLink(link);
        if (validationError) {
            useToastStore.getState().addToast(validationError, "error");
            return;
        }

        const { links } = useLinkStore.getState();
        try {
            set({ isLoading: true, error: null });
            const response = await linkServices.createLink(link);
            if (response.success) {
                set({ links: [...links, response.data] });
                useToastStore.getState().addToast("Link added successfully", "success");
            }
        } catch (error) {
            set({ error: "Failed to add link" });
            useToastStore.getState().addToast("Failed to add link", "error");
        } finally {
            set({ isLoading: false });
        }
    },
    updateLink: async (link: Link) => {
        const validationError = validateLink(link);
        if (validationError) {
            useToastStore.getState().addToast(validationError, "error");
            return;
        }

        const { links } = useLinkStore.getState();
        try {
            set({ isLoading: true, error: null });
            // Optimistic update
            set({ links: links.map((l) => (l._id === link._id ? link : l)) });

            const response = await linkServices.updateLink(link);
            if (response.success) {
                useToastStore.getState().addToast("Link updated successfully", "success");
            } else {
                // Revert if failed
                set({ links });
                useToastStore.getState().addToast("Failed to update link", "error");
            }
        } catch (error) {
            set({ links, error: "Failed to update link" });
            useToastStore.getState().addToast("Failed to update link", "error");
        } finally {
            set({ isLoading: false });
        }
    },
    deleteLink: async (linkId: string) => {
        const { links } = useLinkStore.getState();
        try {
            set({ isLoading: true, error: null });
            // Optimistic update
            set({ links: links.filter((l) => l._id !== linkId) });

            const response = await linkServices.deleteLink(linkId);
            if (response.success) {
                useToastStore.getState().addToast("Link deleted successfully", "success");
            } else {
                // Revert
                set({ links });
                useToastStore.getState().addToast("Failed to delete link", "error");
            }
        } catch (error) {
            set({ links, error: "Failed to delete link" });
            useToastStore.getState().addToast("Failed to delete link", "error");
        } finally {
            set({ isLoading: false });
        }
    }
}))