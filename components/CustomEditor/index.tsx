'use client';

import {imageAPI} from '@/modules';

import {BlockNoteView, useBlockNote} from '@blocknote/react';

import {useLoadingStore} from '@/store/loading';

import '@blocknote/core/style.css';
import {useEffect} from 'react';

interface Props {
  onChange: (value: string) => void;
  content?: string;
}

export default function MyEditor({onChange, content}: Props) {
  const {showLoading, hideLoading} = useLoadingStore();

  const editor = useBlockNote({
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

  useEffect(() => {
    if (editor) {
      const getBlocks = async () => {
        const blocks = await editor.tryParseHTMLToBlocks(content || '');
        setTimeout(() => {
          editor.replaceBlocks(editor.topLevelBlocks, blocks);
        }, 100);
      };
      getBlocks();
    }
  }, [editor, content]);

  return (
    <>
      <BlockNoteView editor={editor} theme="light" />
    </>
  );
}
