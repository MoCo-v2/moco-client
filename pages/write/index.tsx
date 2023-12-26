import {useRef} from 'react';
import dynamic from 'next/dynamic';

import {Editor} from '@toast-ui/react-editor';

const MyEditor = dynamic(() => import('@/components/CustomEditor'), {
  ssr: false,
});

import {AppLayout} from '@/layouts/AppLayout';

export default function Write() {
  const editorRef = useRef<Editor>(null);

  const onChange = () => {
    const data = editorRef.current?.getInstance().getHTML();
    console.log(data);
  };
  return (
    <AppLayout>
      <MyEditor editorRef={editorRef} onChange={onChange} />
    </AppLayout>
  );
}
