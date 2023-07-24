import * as React from 'react';
import { styled } from 'styled-components';
import axios from 'axios';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RangeStatic } from 'quill';
import { IEditInfo } from '../../interface/board.ts';

interface IEditor {
  info: IEditInfo;
  setInfo: React.Dispatch<React.SetStateAction<IEditInfo>>;
}

const TextEditor = ({ info, setInfo }: IEditor) => {
  const quillRef = React.useRef<ReactQuill>(null);

  // 이미지 업로드 핸들러, modules 설정보다 위에 있어야 정상 적용
  const imageHandler = () => {
    // file input 임의 생성
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files;
      const formData = new FormData();
      if (file) {
        formData.append('multipartFile', file[0]);
      }

      // file 데이터 담아서 서버에 전달하여 이미지 업로드
      const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/post/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);

      if (quillRef.current) {
        // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 불러오는 url을 이용하여 이미지 태그 추가
        const index = (quillRef.current.getEditor().getSelection() as RangeStatic).index;

        const quillEditor = quillRef.current.getEditor();
        quillEditor.setSelection(index, 1);

        quillEditor.clipboard.dangerouslyPasteHTML(index, `<img src=${res.data[0]} alt=${'alt text'} />`);
      }
    };
  };

  // useMemo를 사용하지 않고 handler를 등록할 경우 타이핑 할때마다 focus가 벗어남
  const modules = React.useMemo(
    () => ({
      toolbar: {
        // container에 등록되는 순서대로 tool 배치
        container: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike'], ['link', 'image']],

        // custom 핸들러 설정
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    []
  );

  // toolbar에 사용되는 tool format
  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'link', 'image'];

  return (
    <CustomReactQuill>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        value={info.content}
        placeholder="내용을 입력하세요."
        onChange={(content) => {
          setInfo({ ...info, content: content });
        }}
        // onChange={(content, delta, source, editor) => {
        //   setInfo({ ...info, content: editor.getHTML() });
        //   console.log(content, delta, source, editor);
        // }}
      />
    </CustomReactQuill>
  );
};

export default TextEditor;

// style
const CustomReactQuill = styled.div`
  .ql-toolbar {
    border-radius: 5px 5px 0 0;
  }
  .ql-container {
    border-radius: 0 0 5px 5px;
  }
  .ql-editor {
    height: 100px;
    @media screen and (min-width: 768px) {
      height: 300px;
    }
  }
`;
