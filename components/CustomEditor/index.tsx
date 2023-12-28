'use client';

import {Editor} from '@toast-ui/react-editor';
import {HookCallback} from '@toast-ui/editor/types/editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';

import {imageAPI} from '@/modules';

const toolbarItems = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr'],
  ['ul', 'ol', 'task'],
  ['table', 'link'],
  ['image'],
  ['code', 'codeblock'],
];

interface Props {
  editorRef: React.RefObject<Editor>;
  onChange: () => void;
  initialValue?: string;
}

export default function MyEditor({editorRef, onChange, initialValue}: Props) {
  const onUploadImage = async (blob: Blob, callback: HookCallback) => {
    const formData = new FormData();
    formData.append('image', blob);
    try {
      const imageURL = await imageAPI.uploadImage(formData);
      callback(imageURL, 'image');
      return false;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={initialValue}
          initialEditType="wysiwyg"
          hideModeSwitch={true}
          height="50rem"
          language="ko-KR"
          theme={''}
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut={true}
          plugins={[colorSyntax, [codeSyntaxHighlight, {highlighter: Prism}]]}
          hooks={{addImageBlobHook: onUploadImage}}
          onChange={onChange}
        />
      )}
    </>
  );
}
