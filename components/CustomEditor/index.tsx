'use client';

import {imageAPI} from '@/modules';

import {BlockNoteEditor} from '@blocknote/core';
import {BlockNoteView, useBlockNote} from '@blocknote/react';

import {useLoadingStore} from '@/store/loading';

import '@blocknote/core/style.css';

interface Props {
  onChange: (value: string) => void;
}

export default function MyEditor({onChange}: Props) {
  const {showLoading, hideLoading} = useLoadingStore();
  const editor: BlockNoteEditor | null = useBlockNote({
    onEditorContentChange: editor => {
      const saveBlocksAsHTML = async () => {
        const html: string = await editor.blocksToHTMLLossy(
          editor.topLevelBlocks,
        );
        onChange(html);
      };
      saveBlocksAsHTML();
    },
    uploadFile: file => {
      const onUploadImage = async () => {
        try {
          showLoading();
          const formData = new FormData();
          formData.append('image', file);
          const imageURL = await imageAPI.uploadImage(formData);
          return imageURL || '';
        } catch (error) {
          console.log(error);
        } finally {
          hideLoading();
        }
      };
      return onUploadImage();
    },
  });

  return (
    <>
      <BlockNoteView editor={editor} theme="light" />
    </>
  );
}
