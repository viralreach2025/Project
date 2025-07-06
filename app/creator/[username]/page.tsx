"use client";

import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
// Remove the problematic ffmpeg import for now
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const initialProfile = {
  name: "La'Shyra Courtney",
  role: "Content Creator/Dance Artist/Model",
  location: "Atlanta, GA, United States",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  headline: "Content Creator, Dance Artist, Model, Fashion & Beauty",
  gallery: [
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
  ],
  social: {
    instagram: "lashyra.courtney",
    tiktok: "lashyra.courtney",
    youtube: "lashyra.courtney"
  },
  bio: `I'm a dance artist/athlete and content creator. I really enjoy photography and product photo shoots. Most of my content is centered around modeling and product shoots for dance and fashion/beauty products. I like to take a modern approach to my content, and I'm always experimenting with new styles!`
};

const socialIcons = {
  instagram: (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  tiktok: (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  youtube: (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
};

export default function CreatorProfile({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState({
    name: false,
    role: false,
    location: false,
    bio: false,
    headline: false
  });
  const [avatarEdit, setAvatarEdit] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [addImageMode, setAddImageMode] = useState(false);
  const [newGallery, setNewGallery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const [deletingItems, setDeletingItems] = useState<string[]>([]);
  const [selectedMediaForUpload, setSelectedMediaForUpload] = useState<{
    type: 'image' | 'video';
    target: 'gallery' | 'portfolio' | 'avatar' | 'netflix';
    index?: number;
    itemId?: string | number;
  } | null>(null);
  const [isOwner, setIsOwner] = useState(false); // Will be set based on authentication
  const [profileExists, setProfileExists] = useState(false); // Track if profile exists in DB

  const [portfolioImages, setPortfolioImages] = useState<(string | File)[]>([
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    "",
    "",
    "",
    ""
  ]);
  const [portfolioVideos, setPortfolioVideos] = useState<(string | File)[]>([
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "",
    ""
  ]);

  // State for portfolio items with editable titles
  const [portfolioItems, setPortfolioItems] = useState<Array<{
    id: string | number;
    title: string;
    type: 'image' | 'video';
    image?: string;
    video?: string;
    thumbnail?: string;
    isEditingTitle?: boolean;
  }>>([]);

  // Function to handle title editing
  const handleTitleEdit = (itemId: string | number, newTitle: string) => {
    setPortfolioItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, title: newTitle, isEditingTitle: false }
        : item
    ));
    setHasUnsavedChanges(true);
  };

  // Function to start title editing
  const startTitleEdit = (itemId: string | number) => {
    setPortfolioItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, isEditingTitle: true }
        : { ...item, isEditingTitle: false }
    ));
  };

  // Function to cancel title editing
  const cancelTitleEdit = (itemId: string | number) => {
    setPortfolioItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, isEditingTitle: false }
        : item
    ));
  };

  // Function to delete portfolio item
  const deletePortfolioItem = async (itemId: string | number) => {
    try {
      // Add to deleting items list
      setDeletingItems(prev => [...prev, itemId.toString()]);
      
      // Find the item to be deleted
      const itemToDelete = portfolioItems.find(item => item.id === itemId);
      
      if (itemToDelete) {
        console.log('Deleting portfolio item:', itemToDelete);
        
        // Delete from database if it has a real ID (not temp ID)
        if (typeof itemToDelete.id === 'string' && !itemToDelete.id.startsWith('temp-')) {
          const { error: dbError } = await supabase
            .from('portfolio_items')
            .delete()
            .eq('id', itemToDelete.id);
            
          if (dbError) {
            console.error('Error deleting from database:', dbError);
            alert('Failed to delete from database. Please try again.');
            return;
          }
          console.log('Successfully deleted from database');
        }
        
        // Delete file from Supabase storage
        if (itemToDelete.image || itemToDelete.video) {
          const fileUrl = itemToDelete.image || itemToDelete.video;
          if (fileUrl && fileUrl.includes('supabase.co')) {
            // Extract file path from URL
            const urlParts = fileUrl.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const filePath = `${params.username}/${itemToDelete.type === 'video' ? 'videos' : 'images'}/${fileName}`;
            
            console.log('Deleting file from storage:', filePath);
            
            const { error: storageError } = await supabase.storage
              .from('portfolio-media')
              .remove([filePath]);
              
            if (storageError) {
              console.error('Error deleting file from storage:', storageError);
              // Don't fail the deletion if storage cleanup fails
            } else {
              console.log('Successfully deleted file from storage');
            }
          }
        }
      }
      
      // Remove from local state
      setPortfolioItems(prev => prev.filter(item => item.id !== itemId));
      setHasUnsavedChanges(true);
      
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      alert('Failed to delete item. Please try again.');
    } finally {
      // Remove from deleting items list
      setDeletingItems(prev => prev.filter(id => id !== itemId.toString()));
    }
  };


  // Inline media upload handler
  const handleInlineMediaUpload = (type: 'image' | 'video', target: 'gallery' | 'portfolio' | 'avatar' | 'netflix', index?: number, itemId?: string | number) => {
    setSelectedMediaForUpload({ type, target, index, itemId });
    // Trigger the hidden file input
    const fileInput = document.getElementById('inline-media-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // Video upload optimization and validation - Updated for 30s/10MB limits
  const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_VIDEO_DURATION = 30; // 30 seconds
  const SUPPORTED_VIDEO_FORMATS = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];

  // Validate video file before upload
  const validateVideoFile = (file: File): Promise<{ valid: boolean; error?: string }> => {
    return new Promise((resolve) => {
      // Check file size
      if (file.size > MAX_VIDEO_SIZE) {
        resolve({ 
          valid: false, 
          error: `Video too large. Maximum size is ${MAX_VIDEO_SIZE / (1024 * 1024)}MB` 
        });
        return;
      }

      // Check file format
      if (!SUPPORTED_VIDEO_FORMATS.includes(file.type)) {
        resolve({ 
          valid: false, 
          error: 'Unsupported video format. Please use MP4, WebM, MOV, or AVI' 
        });
        return;
      }

      // Check video duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      let blobUrl: string | null = null;
      
      video.onloadedmetadata = () => {
        if (video.duration > MAX_VIDEO_DURATION) {
          resolve({ 
            valid: false, 
            error: `Video too long. Maximum duration is ${MAX_VIDEO_DURATION} seconds` 
          });
        } else {
          resolve({ valid: true });
        }
        // Clean up blob URL
        if (blobUrl) {
          URL.revokeObjectURL(blobUrl);
        }
      };

      video.onerror = () => {
        resolve({ valid: false, error: 'Invalid video file' });
        // Clean up blob URL
        if (blobUrl) {
          URL.revokeObjectURL(blobUrl);
        }
      };

      blobUrl = URL.createObjectURL(file);
      video.src = blobUrl;
    });
  };

  // Simple video compression utility (fallback approach)
  const compressVideoSimple = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      // Create a video element to get video properties
      const video = document.createElement('video');
      video.preload = 'metadata';
      let blobUrl: string | null = null;
      
      video.onloadedmetadata = () => {
        // Create canvas for compression
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size (compress to 480p)
        const maxWidth = 480;
        const maxHeight = 480;
        const ratio = Math.min(maxWidth / video.videoWidth, maxHeight / video.videoHeight);
        
        canvas.width = video.videoWidth * ratio;
        canvas.height = video.videoHeight * ratio;
        
        // Create MediaRecorder for compression
        const stream = canvas.captureStream(30); // 30 FPS
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp9',
          videoBitsPerSecond: 800000 // 800kbps for compression
        });
        
        const chunks: Blob[] = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
        
        mediaRecorder.onstop = () => {
          const compressedBlob = new Blob(chunks, { type: 'video/webm' });
          const compressedFile = new File([compressedBlob], 
            file.name.replace(/\.[^/.]+$/, '') + '-compressed.webm', 
            { type: 'video/webm' }
          );
          // Clean up blob URL
          if (blobUrl) {
            URL.revokeObjectURL(blobUrl);
          }
          resolve(compressedFile);
        };
        
        // Start recording
        mediaRecorder.start();
        
        // Play video and capture frames
        video.currentTime = 0;
        video.play();
        
        const drawFrame = () => {
          if (video.ended || video.paused) {
            mediaRecorder.stop();
            return;
          }
          
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
          
          requestAnimationFrame(drawFrame);
        };
        
        drawFrame();
      };
      
      video.onerror = () => {
        // Fallback to original file if compression fails
        if (blobUrl) {
          URL.revokeObjectURL(blobUrl);
        }
        resolve(file);
      };
      
      blobUrl = URL.createObjectURL(file);
      video.src = blobUrl;
    });
  };

  // Chunked upload for large files
  const uploadInChunks = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = Math.random().toString(36).substr(2, 9);
    
    let uploadedChunks = 0;

    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      // Simulate chunk upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      uploadedChunks++;
      if (onProgress) {
        onProgress((uploadedChunks / totalChunks) * 100);
      }
    }

    // Simulate finalizing upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return `https://example.com/uploads/${uploadId}.mp4`;
  };

  // Generate video thumbnail with improved error handling
  const generateVideoThumbnail = (videoFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.crossOrigin = 'anonymous'; // Try to handle CORS
      let blobUrl: string | null = null;
      let timeoutId: NodeJS.Timeout;
      
      const cleanup = () => {
        if (blobUrl) {
          URL.revokeObjectURL(blobUrl);
        }
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
      
      const fallback = () => {
        cleanup();
        resolve('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80');
      };
      
      // Set a timeout to prevent hanging
      timeoutId = setTimeout(() => {
        console.log('⏰ Thumbnail generation timed out, using fallback');
        fallback();
      }, 10000); // 10 second timeout
      
      video.onloadedmetadata = () => {
        console.log('📹 Video metadata loaded, seeking to 1 second...');
        try {
          // Try to seek to 1 second, but fallback to 0 if that fails
          video.currentTime = Math.min(1, video.duration / 2);
        } catch (error) {
          console.log('⚠️ Could not seek to 1 second, trying 0...');
          video.currentTime = 0;
        }
      };
      
      video.onseeked = () => {
        console.log('🎯 Video seeked, generating thumbnail...');
        try {
          const canvas = document.createElement('canvas');
          // Set reasonable canvas size for thumbnail
          const maxSize = 400;
          const ratio = Math.min(maxSize / video.videoWidth, maxSize / video.videoHeight);
          canvas.width = video.videoWidth * ratio;
          canvas.height = video.videoHeight * ratio;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Could not get canvas context');
          }
          
          // Draw the video frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert to data URL
          const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
          console.log('✅ Thumbnail generated successfully');
          
          cleanup();
          resolve(thumbnailUrl);
        } catch (error) {
          console.error('❌ Thumbnail generation failed:', error);
          fallback();
        }
      };
      
      video.onerror = (error) => {
        console.error('❌ Video error during thumbnail generation:', error);
        fallback();
      };
      
      video.onabort = () => {
        console.log('⚠️ Video loading aborted');
        fallback();
      };
      
      try {
        blobUrl = URL.createObjectURL(videoFile);
        video.src = blobUrl;
        video.load(); // Explicitly load the video
      } catch (error) {
        console.error('❌ Error creating blob URL:', error);
        fallback();
      }
    });
  };

  // Handle file selection for inline upload
  const handleInlineFileSelect = async (files: FileList) => {
    if (!selectedMediaForUpload || files.length === 0) return;

    const file = files[0];
    const { type, target, index, itemId } = selectedMediaForUpload;
    
    // Create data URL for preview
    const reader = new FileReader();
    const previewUrl = await new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
    
    // Generate thumbnail for videos
    let thumbnailUrl = previewUrl;
    if (type === 'video') {
      try {
        console.log('🎬 Generating thumbnail for inline video upload...');
        thumbnailUrl = await generateVideoThumbnail(file);
        console.log('✅ Inline thumbnail generated successfully');
      } catch (error) {
        console.error('❌ Failed to generate inline thumbnail:', error);
        // Fallback to a default thumbnail
        thumbnailUrl = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80';
      }
    }
    
    // Simulate upload
    const fileId = Math.random().toString(36).substr(2, 9);
    setUploadingFiles(prev => [...prev, fileId]);
    
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Update the appropriate state based on target
    switch (target) {
      case 'gallery':
        // For gallery, we'll use the data URL
        if (index !== undefined) {
          setProfile(prev => ({
            ...prev,
            gallery: prev.gallery.map((url, i) => i === index ? previewUrl : url)
          }));
        } else {
          setProfile(prev => ({
            ...prev,
            gallery: [...prev.gallery, previewUrl]
          }));
        }
        break;
        
      case 'portfolio':
        if (type === 'image') {
          setPortfolioImages(prev => {
            const newImages = [...prev];
            if (index !== undefined) {
              newImages[index] = previewUrl;
            } else {
              const emptyIndex = newImages.findIndex(img => !img);
              if (emptyIndex !== -1) {
                newImages[emptyIndex] = previewUrl;
              } else {
                newImages.push(previewUrl);
              }
            }
            return newImages;
          });
        } else {
          setPortfolioVideos(prev => {
            const newVideos = [...prev];
            if (index !== undefined) {
              newVideos[index] = previewUrl;
            } else {
              const emptyIndex = newVideos.findIndex(vid => !vid);
              if (emptyIndex !== -1) {
                newVideos[emptyIndex] = previewUrl;
              } else {
                newVideos.push(previewUrl);
              }
            }
            return newVideos;
          });
        }
        break;
        
      case 'avatar':
        setProfile(prev => ({ ...prev, avatar: previewUrl }));
        break;
        
      case 'netflix':
        if (itemId) {
          if (type === 'image') {
            setPortfolioItems(prev => prev.map(item => 
              item.id === itemId ? { ...item, image: previewUrl } : item
            ));
          } else {
            setPortfolioItems(prev => prev.map(item => 
              item.id === itemId ? { ...item, video: previewUrl, thumbnail: thumbnailUrl } : item
            ));
          }
        }
        break;
    }
    
    setUploadingFiles(prev => prev.filter(id => id !== fileId));
    setSelectedMediaForUpload(null);
    setHasUnsavedChanges(true);
  };

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      console.log('Component unmounting - cleaning up blob URLs');
      // Clean up any remaining blob URLs
      const allElements = document.querySelectorAll('img, video, iframe');
      allElements.forEach(element => {
        const src = element.getAttribute('src');
        if (src && src.startsWith('blob:')) {
          try {
            URL.revokeObjectURL(src);
            console.log('Revoked blob URL on unmount:', src);
          } catch (e) {
            console.log('Could not revoke blob URL on unmount:', src, e);
          }
        }
      });
    };
  }, []);

  function handlePortfolioDrop(idx: number, file: File | string, type: "image" | "video") {
    if (type === "image") {
      setPortfolioImages(imgs => {
        const copy = [...imgs];
        copy[idx] = file;
        return copy;
      });
    } else {
      setPortfolioVideos(vids => {
        const copy = [...vids];
        copy[idx] = file;
        return copy;
      });
    }
  }
  function handlePortfolioRemove(idx: number, type: "image" | "video") {
    if (type === "image") {
      setPortfolioImages(imgs => {
        const copy = [...imgs];
        copy[idx] = "";
        return copy;
      });
    } else {
      setPortfolioVideos(vids => {
        const copy = [...vids];
        copy[idx] = "";
        return copy;
      });
    }
  }

  function PortfolioSlot({ type, file, onDrop, onRemove, isOwner }: {
    type: "image" | "video",
    file: string | File,
    onDrop: (file: File | string) => void,
    onRemove: () => void,
    isOwner: boolean
  }) {
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | undefined>();
    
    // Create and manage blob URL
    useEffect(() => {
      if (file && typeof file !== "string") {
        const blobUrl = URL.createObjectURL(file);
        setPreview(blobUrl);
        
        // Cleanup function
        return () => {
          URL.revokeObjectURL(blobUrl);
        };
      } else if (typeof file === "string" && file) {
        setPreview(file);
      } else {
        setPreview(undefined);
      }
    }, [file]);
    return (
      <div
        className={`relative rounded-xl border-2 border-dashed flex items-center justify-center aspect-square bg-white/60 overflow-hidden ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) onDrop(file);
        }}
        onClick={() => isOwner && inputRef.current?.click()}
        style={{ cursor: isOwner ? "pointer" : "default" }}
      >
        {preview ? (
          type === "image" ? (
            <img src={preview} alt="Portfolio" className="w-full h-full object-cover" />
          ) : preview.match(/(youtube|youtu.be|tiktok|instagram)/i) ? (
            <iframe src={preview} title="Short" className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
          ) : (
            <video src={preview} controls className="w-full h-full object-cover" />
          )
        ) : (
          isOwner ? (
            <span className="text-3xl text-gray-400">+</span>
          ) : (
            <span className="text-gray-400">Empty</span>
          )
        )}
        {isOwner && file && (
          <button
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-red-500 hover:bg-white shadow"
            onClick={e => { e.stopPropagation(); onRemove(); }}
          >
            ×
          </button>
        )}
        {isOwner && (
          <input
            ref={inputRef}
            type="file"
            accept={type === "image" ? "image/*" : "video/*,.mp4,.mov,.webm"}
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) onDrop(file);
            }}
          />
        )}
      </div>
    );
  }

  // Carousel controls
  const prevImg = () => setCarouselIdx((i) => (i === 0 ? profile.gallery.length - 1 : i - 1));
  const nextImg = () => setCarouselIdx((i) => (i === profile.gallery.length - 1 ? 0 : i + 1));

  // Gallery add
  const handleAddGallery = () => {
    if (newGallery) {
      setProfile((p) => ({ ...p, gallery: [...p.gallery, newGallery] }));
      setNewGallery("");
      setAddImageMode(false);
      setCarouselIdx(profile.gallery.length); // Show new image
    }
  };

  // Gallery remove
  const handleRemoveGallery = (idx: number) => {
    setProfile((p) => ({ ...p, gallery: p.gallery.filter((_, i) => i !== idx) }));
    setCarouselIdx((i) => (i > 0 ? i - 1 : 0));
  };

  // Avatar
  const handleAvatarChange = () => {
    if (newAvatar) {
      setProfile((p) => ({ ...p, avatar: newAvatar }));
      setNewAvatar("");
      setAvatarEdit(false);
    }
  };



  // Vertical card grid component
  function PortfolioGrid({ title, items }: { title: string, items: Array<{
    id: string | number;
    title: string;
    type: 'image' | 'video';
    image?: string;
    video?: string;
    thumbnail?: string;
    isEditingTitle?: boolean;
  }> }) {
    const [draggedItem, setDraggedItem] = useState<string | number | null>(null);
    const [dragOverItem, setDragOverItem] = useState<string | number | null>(null);

    const handleDragStart = (e: React.DragEvent, itemId: string | number) => {
      if (!editMode) return;
      setDraggedItem(itemId);
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, itemId: string | number) => {
      if (!editMode) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOverItem(itemId);
    };

    const handleDragLeave = () => {
      setDragOverItem(null);
    };

    const handleDrop = (e: React.DragEvent, targetItemId: string | number) => {
      if (!editMode || !draggedItem || draggedItem === targetItemId) return;
      
      e.preventDefault();
      
      // Reorder items
      const draggedIndex = items.findIndex(item => item.id === draggedItem);
      const targetIndex = items.findIndex(item => item.id === targetItemId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newItems = [...items];
        const [draggedItemData] = newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, draggedItemData);
        
        setPortfolioItems(newItems);
        setHasUnsavedChanges(true);
      }
      
      setDraggedItem(null);
      setDragOverItem(null);
    };

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6 px-4">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {editMode && (
              <div className="flex items-center gap-4 mt-1">
                {items.length > 1 && (
                  <p className="text-sm text-neutral-500 flex items-center gap-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-neutral-400">
                      <path d="M8 6h8M8 12h8M8 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Drag items to reorder
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-blue-400">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {items.filter(item => item.type === 'image').length}/7 images
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-red-400">
                      <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {items.filter(item => item.type === 'video').length}/3 videos
                  </span>
                </div>
              </div>
            )}
          </div>
          {editMode && items.length === 0 && (
            <button
              onClick={addSamplePortfolioItems}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <span>✨</span>
              Add Sample Items
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className={`bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer ${
                editMode ? 'hover:ring-2 hover:ring-blue-500' : ''
              } ${
                draggedItem === item.id ? 'opacity-50 scale-95' : ''
              } ${
                dragOverItem === item.id ? 'ring-2 ring-blue-500 scale-110' : ''
              }`}
              draggable={editMode}
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item.id)}
              onClick={() => {
                if (editMode) {
                  handleInlineMediaUpload(item.type === 'video' ? 'video' : 'image', 'netflix', undefined, item.id);
                }
              }}
            >
              <div className="relative aspect-[3/4]">
                {item.type === "video" ? (
                  <video 
                    src={item.video} 
                    poster={item.thumbnail} 
                    className="w-full h-full object-cover" 
                    controls
                    controlsList="nodownload"
                    onPlay={(e) => {
                      // Pause all other videos
                      const videos = document.querySelectorAll('video');
                      videos.forEach(video => {
                        if (video !== e.target) {
                          video.pause();
                        }
                      });
                    }}
                  />
                ) : (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                )}
                {item.type === "video" && !editMode && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/50 rounded-full p-2">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
                {editMode && (
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity flex gap-2">
                      {/* Drag handle */}
                      <div className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-full transition-colors cursor-grab active:cursor-grabbing">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white stroke-current">
                          <path d="M8 6h8M8 12h8M8 18h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
                            await deletePortfolioItem(item.id);
                          }
                        }}
                        disabled={deletingItems.includes(item.id.toString())}
                        className={`p-2 rounded-full transition-colors ${
                          deletingItems.includes(item.id.toString())
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                        title="Delete item"
                      >
                        {deletingItems.includes(item.id.toString()) ? (
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white animate-spin">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white stroke-current">
                            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInlineMediaUpload(item.type === 'video' ? 'video' : 'image', 'netflix', undefined, item.id);
                        }}
                        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                        title="Edit item"
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white stroke-current">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    {item.isEditingTitle ? (
                      <input
                        type="text"
                        className="text-sm font-semibold bg-neutral-800/50 border border-neutral-600 rounded px-1 py-0.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.title}
                        onChange={(e) => handleTitleEdit(item.id, e.target.value)}
                        onBlur={() => cancelTitleEdit(item.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleTitleEdit(item.id, item.title);
                          } else if (e.key === 'Escape') {
                            cancelTitleEdit(item.id);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <h3 
                        className="font-semibold text-sm mb-1 line-clamp-2 cursor-pointer hover:text-blue-400 transition-colors"
                        onClick={(e) => {
                          if (editMode) {
                            e.stopPropagation();
                            startTitleEdit(item.id);
                          }
                        }}
                      >
                        {item.title}
                      </h3>
                    )}
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.type === 'video' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.type === 'video' ? 'Video' : 'Image'}
                      </span>
                    </div>
                  </div>
                  {editMode && (
                    <div className="relative">
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
                            await deletePortfolioItem(item.id);
                          }
                        }}
                        disabled={deletingItems.includes(item.id.toString())}
                        className={`p-1 rounded transition-colors ${
                          deletingItems.includes(item.id.toString())
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-400 hover:text-red-300 hover:bg-red-500/20'
                        }`}
                        title="Delete item"
                      >
                        {deletingItems.includes(item.id.toString()) ? (
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="animate-spin">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="stroke-current">
                            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Show empty state when not in edit mode and no items */}
          {!editMode && items.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-neutral-500">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-300 mb-2">No Portfolio Items Yet</h3>
              <p className="text-neutral-500 text-sm">This creator hasn't added any portfolio items yet.</p>
            </div>
          )}
          
          {/* Add specific placeholder slots for images and videos */}
          {editMode && (() => {
            const imageCount = items.filter(item => item.type === 'image').length;
            const videoCount = items.filter(item => item.type === 'video').length;
            const maxImages = 7;
            const maxVideos = 3;
            
            const imagePlaceholders = Array.from({ length: Math.max(0, maxImages - imageCount) });
            const videoPlaceholders = Array.from({ length: Math.max(0, maxVideos - videoCount) });
            
            return [...imagePlaceholders, ...videoPlaceholders].map((_, index) => {
              const isVideoSlot = index >= imagePlaceholders.length;
              const slotNumber = isVideoSlot ? index - imagePlaceholders.length + 1 : index + 1;
              
              return (
                <div 
                  key={`placeholder-${isVideoSlot ? 'video' : 'image'}-${slotNumber}`}
                  className="bg-neutral-800/50 border-2 border-dashed border-neutral-600 rounded-lg aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-neutral-800 transition-colors group"
                  onClick={() => {
                    // Create a hidden file input and trigger it
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = isVideoSlot ? 'video/*' : 'image/*';
                    fileInput.style.display = 'none';
                    
                    fileInput.onchange = (e) => {
                      const files = (e.target as HTMLInputElement).files;
                      if (files && files.length > 0) {
                        const file = files[0];
                        const fileType = file.type.startsWith('video/') ? 'video' : 'image';
                        
                        // Validate that the correct file type is being uploaded
                        if ((isVideoSlot && fileType !== 'video') || (!isVideoSlot && fileType !== 'image')) {
                          alert(`This slot is for ${isVideoSlot ? 'videos' : 'images'} only. Please select a ${isVideoSlot ? 'video' : 'image'} file.`);
                          document.body.removeChild(fileInput);
                          return;
                        }
                        
                        handleFileUpload(files, fileType, 'portfolio');
                      }
                      document.body.removeChild(fileInput);
                    };
                    
                    document.body.appendChild(fileInput);
                    fileInput.click();
                  }}
                >
                  <div className="text-center p-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      isVideoSlot ? 'bg-red-500/20' : 'bg-blue-500/20'
                    }`}>
                      {isVideoSlot ? (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-red-400">
                          <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-blue-400">
                          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <p className={`text-sm font-medium mb-1 ${
                      isVideoSlot ? 'text-red-400' : 'text-blue-400'
                    }`}>
                      {isVideoSlot ? `Video ${slotNumber}` : `Image ${slotNumber}`}
                    </p>
                    <p className="text-xs text-neutral-500">Click to upload {isVideoSlot ? 'video' : 'image'}</p>
                    <div className="mt-2 text-xs text-neutral-600">
                      {isVideoSlot ? 'Max 30s, 10MB' : 'Max 10MB'}
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    );
  }

  // Save profile changes
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasUnsavedChanges(false);
    setEditMode(false);
    // Here you would typically save to your backend
    console.log('Profile saved:', profile);
  };

  // Track changes for unsaved changes warning
  const updateProfile = (updates: Partial<typeof profile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  // Utility: Compress video using ffmpeg.wasm
  // const ffmpeg = createFFmpeg({ log: false });
  // async function compressVideoFFmpeg(file: File): Promise<File> {
  //   if (!ffmpeg.isLoaded()) {
  //     await ffmpeg.load();
  //   }
  //   const inputName = 'input.mp4';
  //   const outputName = 'output.mp4';
  //   ffmpeg.FS('writeFile', inputName, await fetchFile(file));
  //   // Compress to 480p, lower bitrate, 30s max
  //   await ffmpeg.run(
  //     '-i', inputName,
  //     '-vf', 'scale=480:-2',
  //     '-b:v', '800k',
  //     '-t', '30',
  //     '-preset', 'veryfast',
  //     outputName
  //   );
  //   const data = ffmpeg.FS('readFile', outputName);
  //   const compressedFile = new File([data.buffer], file.name.replace(/\.[^/.]+$/, '') + '-compressed.mp4', { type: 'video/mp4' });
  //   ffmpeg.FS('unlink', inputName);
  //   ffmpeg.FS('unlink', outputName);
  //   return compressedFile;
  // }

  // Update your file upload handler to use Supabase storage
  const handleFileUpload = async (files: FileList, type: 'image' | 'video', target: 'gallery' | 'portfolio') => {
    console.log('🚀 Starting file upload process...');
    console.log('Files:', files);
    console.log('Type:', type);
    console.log('Target:', target);
    
    const fileArray = Array.from(files);
    const newFiles = fileArray.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: '', // Don't create blob URL for preview since we're not using it
      uploading: true
    }));

    setUploadingFiles(prev => [...prev, ...newFiles.map(f => f.id)]);

    for (const fileObj of newFiles) {
      let uploadFile = fileObj.file;
      
      console.log('📁 Processing file:', uploadFile.name);
      console.log('File size:', uploadFile.size);
      console.log('File type:', uploadFile.type);
      
      // Validate file before upload
      if (type === 'video') {
        const validation = await validateVideoFile(uploadFile);
        if (!validation.valid) {
          alert(`Video validation failed: ${validation.error}`);
          setUploadingFiles(prev => prev.filter(id => id !== fileObj.id));
          continue;
        }
        // Compress video before upload
        uploadFile = await compressVideoSimple(fileObj.file);
      }

      try {
        console.log('Starting upload for:', uploadFile.name);
        
        // Upload to Supabase Storage
        const fileExt = uploadFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `${params.username}/${type}s/${fileName}`;

        console.log('Uploading to path:', filePath);
        console.log('Bucket: portfolio-media');

        // Test storage connection first
        const { data: bucketTest, error: bucketError } = await supabase.storage
          .from('portfolio-media')
          .list('', { limit: 1 });
        
        if (bucketError) {
          console.error('❌ Storage bucket test failed:', bucketError);
          alert(`Storage access failed: ${bucketError.message}`);
          setUploadingFiles(prev => prev.filter(id => id !== fileObj.id));
          continue;
        }
        
        console.log('✅ Storage bucket access successful');

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('portfolio-media')
          .upload(filePath, uploadFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('❌ Upload error:', uploadError);
          console.error('Error details:', {
            message: uploadError.message,
            name: uploadError.name
          });
          alert(`Upload failed: ${uploadError.message}`);
          setUploadingFiles(prev => prev.filter(id => id !== fileObj.id));
          continue;
        }

        console.log('✅ Upload successful:', uploadData);

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio-media')
          .getPublicUrl(filePath);

        console.log('🔗 Public URL:', publicUrl);

        if (target === 'gallery') {
          // Update profile with new gallery image
          setProfile(prev => ({
            ...prev,
            gallery: [...prev.gallery, publicUrl]
          }));
          
          // Save gallery update to database
          const { error: galleryError } = await supabase
            .from('profiles')
            .update({ gallery: [...profile.gallery, publicUrl] })
            .eq('username', params.username);
            
          if (galleryError) {
            console.error('Error saving gallery:', galleryError);
          }
          
        } else if (target === 'portfolio') {
          if (type === 'image') {
            // Add new portfolio item for image
            const newItem = {
              id: `temp-${Date.now()}-${Math.random()}`,
              title: `Image ${portfolioItems.length + 1}`,
              type: 'image' as const,
              image: publicUrl,
              isEditingTitle: false
            };
            
            setPortfolioItems(prev => [...prev, newItem]);

            // Save to database
            const { data: dbItem, error: dbError } = await supabase
              .from('portfolio_items')
              .insert({
                profile_id: params.username,
                title: newItem.title,
                type: 'image',
                file_url: publicUrl,
                file_size: uploadFile.size,
                order_index: portfolioItems.length
              })
              .select()
              .single();

            if (dbError) {
              console.error('Database error:', dbError);
              alert(`Failed to save to database: ${dbError.message}`);
            } else {
              console.log('Portfolio item saved:', dbItem);
              // Update the item with the real database ID
              setPortfolioItems(prev => prev.map(item => 
                item.id === newItem.id ? { ...item, id: dbItem.id } : item
              ));
            }
            
          } else if (type === 'video') {
            // Generate thumbnail from the uploaded video
            let thumbnailUrl = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80';
            
            try {
              console.log('🎬 Generating thumbnail for video...');
              thumbnailUrl = await generateVideoThumbnail(uploadFile);
              console.log('✅ Thumbnail generated successfully:', thumbnailUrl);
            } catch (error) {
              console.error('❌ Failed to generate thumbnail:', error);
              console.log('🔄 Using default thumbnail');
            }

            // Add new portfolio item for video
            const newItem = {
              id: `temp-${Date.now()}-${Math.random()}`,
              title: `Video ${portfolioItems.length + 1}`,
              type: 'video' as const,
              video: publicUrl,
              thumbnail: thumbnailUrl,
              isEditingTitle: false
            };
            
            setPortfolioItems(prev => [...prev, newItem]);

            // Save to database
            const { data: dbItem, error: dbError } = await supabase
              .from('portfolio_items')
              .insert({
                profile_id: params.username,
                title: newItem.title,
                type: 'video',
                file_url: publicUrl,
                thumbnail_url: thumbnailUrl,
                file_size: uploadFile.size,
                duration: 30, // You can get actual duration from video metadata
                order_index: portfolioItems.length
              })
              .select()
              .single();

            if (dbError) {
              console.error('Database error:', dbError);
              alert(`Failed to save to database: ${dbError.message}`);
            } else {
              console.log('Portfolio item saved:', dbItem);
              // Update the item with the real database ID
              setPortfolioItems(prev => prev.map(item => 
                item.id === newItem.id ? { ...item, id: dbItem.id } : item
              ));
            }
          }
        }
        
        console.log('🎉 Upload process completed successfully');
        
      } catch (error) {
        console.error('❌ Error uploading file:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      setUploadingFiles(prev => prev.filter(id => id !== fileObj.id));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: 'image' | 'video', target: 'gallery' | 'portfolio') => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files, type, target);
    }
  };

  // Clean up any File objects in state that might be causing blob URL issues
  const cleanupFileObjects = () => {
    // Force cleanup of any lingering blob URLs
    try {
      URL.revokeObjectURL('blob:http://localhost:3000/69d30e81-631c-4ba1-839a-eccb059fde06');
    } catch (e) {
      // Blob URL already revoked
    }
    
    // Also try to revoke any other blob URLs that might be lingering
    const allElements = document.querySelectorAll('img, video, iframe');
    allElements.forEach(element => {
      const src = element.getAttribute('src');
      if (src && src.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(src);
        } catch (e) {
          // Blob URL already revoked
        }
      }
    });
    
    setPortfolioImages(prev => {
      const cleaned = prev.map(item => {
        if (typeof item === 'string') {
          return item;
        } else {
          console.log('Found File object in portfolioImages:', item);
          return '';
        }
      });
      console.log('Cleaned portfolioImages:', cleaned);
      return cleaned;
    });
    
    setPortfolioVideos(prev => {
      const cleaned = prev.map(item => {
        if (typeof item === 'string') {
          return item;
        } else {
          console.log('Found File object in portfolioVideos:', item);
          return '';
        }
      });
      console.log('Cleaned portfolioVideos:', cleaned);
      return cleaned;
    });
    
    // Also clean up any blob URLs from profile.gallery
    setProfile(prev => {
      const cleanedGallery = prev.gallery.map(url => {
        if (typeof url === 'string' && url.startsWith('blob:')) {
          console.log('Found blob URL in profile.gallery:', url);
          return '';
        }
        return url;
      });
      console.log('Cleaned profile.gallery:', cleanedGallery);
      return { ...prev, gallery: cleanedGallery };
    });
    
    // Clean up any blob URLs from portfolioItems
    setPortfolioItems(prev => {
      const cleaned = prev.map(item => {
        let cleanedItem = { ...item };
        if (item.image && typeof item.image === 'string' && item.image.startsWith('blob:')) {
          console.log('Found blob URL in portfolioItems.image:', item.image);
          cleanedItem.image = '';
        }
        if (item.video && typeof item.video === 'string' && item.video.startsWith('blob:')) {
          console.log('Found blob URL in portfolioItems.video:', item.video);
          cleanedItem.video = '';
        }
        return cleanedItem;
      });
      console.log('Cleaned portfolioItems:', cleaned);
      return cleaned;
    });
  };

  // Load profile data from Supabase
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Check if this profile exists in the database
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', params.username);

        if (error) {
          console.error('Error loading profile:', error);
          return;
        }

        if (profileData && profileData.length > 0) {
          // Profile exists in database - load it
          const profile = profileData[0];
          setProfileExists(true);
          
          setProfile({
            name: profile.name || 'Alex Johnson',
            role: profile.role || 'Content Creator',
            location: profile.location || 'Los Angeles, CA',
            bio: profile.bio || 'Passionate content creator and digital storyteller. I love creating engaging content that connects with audiences and brings brands to life through authentic storytelling.',
            avatar: profile.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80',
            headline: profile.headline || 'Content Creator, Dance Artist, Model, Fashion & Beauty',
            social: profile.social || {
              instagram: 'alexjohnson',
              tiktok: 'alexjohnson',
              youtube: 'alexjohnson'
            },
            gallery: profile.gallery || [
              'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
            ]
          });

          // Load portfolio items from database
          const { data: portfolioData, error: portfolioError } = await supabase
            .from('portfolio_items')
            .select('*')
            .eq('profile_id', params.username)
            .order('order_index', { ascending: true });

          if (portfolioError) {
            console.error('Error loading portfolio:', portfolioError);
            return;
          }

          if (portfolioData && portfolioData.length > 0) {
            const formattedItems = portfolioData.map(item => ({
              id: item.id,
              title: item.title,
              type: item.type,
              image: item.type === 'image' ? item.file_url : undefined,
              video: item.type === 'video' ? item.file_url : undefined,
              thumbnail: item.thumbnail_url,
              isEditingTitle: false
            }));
            setPortfolioItems(formattedItems);
          } else {
            // No portfolio data exists, show empty state for first-time users
            console.log('No portfolio data found, showing empty state');
            setPortfolioItems([]);
          }

          // Check if current user is the owner of this profile
          // For development/testing, let's make the current user always the owner
          // In production, you'd check against the actual authenticated user
          setIsOwner(true); // For testing - always show edit options
          
        } else {
          // Profile doesn't exist yet - this is a first-time visit
          console.log('Profile not found, showing mock data for first-time setup');
          setProfileExists(false);
          
          // For first-time visits, automatically enable edit mode if user is the owner
          setIsOwner(true); // For testing - always show edit options
          setEditMode(true); // Auto-enable edit mode for first-time setup
          
          // Set empty portfolio for first-time setup
          setPortfolioItems([]);
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };

    loadProfile();
  }, [params.username]);

  // Add function to save profile changes to Supabase
  const saveProfileChanges = async () => {
    try {
      setIsSaving(true);
      
      // Save profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          username: params.username,
          name: profile.name,
          role: profile.role,
          location: profile.location,
          bio: profile.bio,
          avatar: profile.avatar,
          headline: profile.headline,
          social: profile.social,
          gallery: profile.gallery,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'username'
        });

      if (profileError) {
        console.error('Error saving profile:', profileError);
        alert('Error saving profile. Please try again.');
        return;
      }

      // Mark profile as existing
      setProfileExists(true);

      // Save all portfolio items that have content
      for (const item of portfolioItems) {
        // Skip empty items
        if (!item.image && !item.video) {
          console.log('Skipping empty portfolio item:', item.id);
          continue;
        }

        // If item has a UUID string ID (from database), update it
        if (item.id && typeof item.id === 'string' && (item.id as string).includes('-') && !(item.id as string).startsWith('temp-')) {
          console.log('Updating existing portfolio item:', item.id);
          const { error: portfolioError } = await supabase
            .from('portfolio_items')
            .update({
              title: item.title,
              type: item.type,
              file_url: item.image || item.video || '',
              thumbnail_url: item.thumbnail,
              order_index: portfolioItems.indexOf(item)
            })
            .eq('id', item.id);

          if (portfolioError) {
            console.error('Error updating portfolio item:', portfolioError);
          }
        } 
        // If item has temporary ID or numeric ID, create new item
        else {
          console.log('Creating new portfolio item:', item.title);
          const { data: newItem, error: portfolioError } = await supabase
            .from('portfolio_items')
            .insert({
              profile_id: params.username,
              title: item.title,
              type: item.type,
              file_url: item.image || item.video || '',
              thumbnail_url: item.thumbnail,
              file_size: 0, // Will be updated if we have file info
              order_index: portfolioItems.indexOf(item)
            })
            .select()
            .single();

          if (portfolioError) {
            console.error('Error creating portfolio item:', portfolioError);
          } else {
            console.log('Successfully created portfolio item:', newItem);
            // Update the item with the real database ID
            setPortfolioItems(prev => prev.map(prevItem => 
              prevItem.id === item.id ? { ...prevItem, id: newItem.id } : prevItem
            ));
          }
        }
      }

      setEditing(prev => ({ ...prev, hasUnsavedChanges: false }));
      setEditMode(false); // Exit edit mode after successful save
      alert('Profile published successfully! Your profile is now live.');
    } catch (error) {
      console.error('Error saving profile changes:', error);
      alert('Error saving profile changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Function to add sample portfolio items for demonstration
  const addSamplePortfolioItems = async () => {
    const sampleItems = [
      { title: "Fashion Shoot", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80", type: "image" as const },
      { title: "Dance Performance", image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=400&q=80", type: "image" as const },
      { title: "Product Campaign", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80", type: "image" as const },
      { title: "Behind the Scenes", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80", type: "image" as const },
      { title: "Studio Session", image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=400&q=80", type: "image" as const }
    ];
    
    // Create temporary items with temporary IDs
    const tempItems = sampleItems.map((item, index) => ({
      ...item,
      id: `temp-${Date.now()}-${index}`
    }));
    
    setPortfolioItems(prev => [...prev, ...tempItems]);
    setHasUnsavedChanges(true);
  };

  // Update the save button click handler
  const handleSaveAndPublish = () => {
    saveProfileChanges();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Floating Edit Button - Always visible for testing */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setEditMode(!editMode)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors shadow-lg ${
            editMode 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {editMode ? '✕ Exit Edit' : '✏️ Edit Profile'}
        </button>
      </div>

      {/* Welcome Banner for First-Time Users */}
      {!profileExists && isOwner && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-2">🎉 Welcome to your new profile!</h2>
            <p className="text-purple-100">
              This is your first time here. Customize your profile and click "Publish Profile" when you're ready to go live!
            </p>
          </div>
        </div>
      )}

      {/* Profile Status Banner */}
      {profileExists && isOwner && (
        <div className="bg-green-600 p-3 text-center">
          <p className="text-green-100">
            ✅ Your profile is live and public! Anyone can view it at this URL.
          </p>
        </div>
      )}

      {/* Edit Mode Controls */}
      {isOwner && (
        <div className="bg-gray-900 border-b border-gray-800 p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              
              {editMode && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  Edit Mode Active
                </div>
              )}
            </div>

            {editMode && (
              <div className="flex gap-3">
                {hasUnsavedChanges && (
                  <div className="flex items-center gap-2 text-sm text-yellow-400">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    Unsaved changes
                  </div>
                )}
                
                <button
                  onClick={handleSaveAndPublish}
                  disabled={isSaving}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      {profileExists ? 'Update Profile' : 'Publish Profile'}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}



      {/* Profile Info Row */}
      <div className="max-w-6xl mx-auto flex items-center gap-8 px-4 py-8">
        <div className="relative">
          <img 
            src={profile.avatar} 
            alt="Avatar" 
            className={`w-28 h-28 rounded-full border-4 border-neutral-800 shadow-lg object-cover ${
              editMode ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
            }`}
            onClick={() => {
              if (editMode) {
                handleInlineMediaUpload('image', 'avatar');
              }
            }}
          />
          {editMode && (
            <button
              onClick={() => setAvatarEdit(true)}
              className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 rounded-full p-2 shadow-lg transition-colors"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            {editMode ? (
              <input
                className="text-2xl font-bold bg-neutral-800/50 border border-neutral-600 rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                placeholder="Name"
              />
            ) : (
              <span className="text-2xl font-bold">{profile.name}</span>
            )}
            {editMode ? (
              <input
                className="text-lg bg-neutral-800/50 border border-neutral-600 rounded px-2 py-1 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.role}
                onChange={(e) => updateProfile({ role: e.target.value })}
                placeholder="Role"
              />
            ) : (
              <span className="text-lg text-neutral-300">{profile.role}</span>
            )}
            {editMode ? (
              <input
                className="text-base bg-neutral-800/50 border border-neutral-600 rounded px-2 py-1 text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.location}
                onChange={(e) => updateProfile({ location: e.target.value })}
                placeholder="Location"
              />
            ) : (
              <span className="text-base text-neutral-400">{profile.location}</span>
            )}
          </div>
          {/* Removed followers and reviews section */}
          <div className="flex gap-3 mt-2">
            {Object.entries(profile.social).map(([platform, handle]) => (
              <div key={platform} className="flex items-center gap-2">
                <a
                  href={platform === "instagram" ? `https://instagram.com/${handle}` : platform === "tiktok" ? `https://tiktok.com/@${handle}` : platform === "youtube" ? `https://youtube.com/${handle}` : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <span className="inline-block transition-transform group-hover:scale-110">
                    {socialIcons[platform]}
                  </span>
                </a>
                {editMode && (
                  <input
                    className="w-24 bg-neutral-800/50 border border-neutral-600 rounded px-1 py-0.5 text-xs text-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={handle}
                    onChange={(e) => updateProfile({ 
                      social: { ...profile.social, [platform]: e.target.value }
                    })}
                    placeholder={platform}
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* About/Bio Section - Moved here */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-neutral-200">About</h3>
            {editMode ? (
              <textarea
                className="w-full bg-neutral-800/50 border border-neutral-600 rounded-lg p-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={profile.bio}
                onChange={(e) => updateProfile({ bio: e.target.value })}
                rows={3}
                placeholder="Tell your story..."
              />
            ) : (
              <p className="text-sm leading-relaxed text-neutral-300">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Netflix-style Content Rows */}
      <div className="max-w-6xl mx-auto">
        {/* Portfolio Section */}
        <div className="mb-8">
          <PortfolioGrid title="Portfolio" items={portfolioItems} />
        </div>
        

      </div>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VR</span>
                </div>
                <span className="text-xl font-bold text-white">ViralReach</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                The ultimate platform for creators to showcase their talent and connect with brands. 
                Build your professional portfolio, grow your audience, and monetize your content.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">For Creators</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Create Profile</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Portfolio Builder</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Brand Collaborations</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Analytics Dashboard</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Creator Resources</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Press</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Contact</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Support</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-neutral-400 text-sm">
              © 2024 ViralReach. All rights reserved.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Hidden file input for inline media upload */}
      <input
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleInlineFileSelect(e.target.files);
          }
        }}
        id="inline-media-upload"
      />
    </div>
  );
}