import Router from 'next/router'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const handleClickIndex = () => Router.push({
  pathname: '/'
})

const style = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '10px 10px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
}

const Index = (props) => (
  <div>
    <a onClick={() => handleClickIndex()} style={style}>Index Page</a>
    <h1>สวัสดี{props.url.query.name}</h1>
    <h2>{props.url.query.email}</h2>
    <h3>{props.url.query.phone}</h3>
    <br/>
    <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onInit={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
            console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
            console.log('Focus.', editor);
        }}
    />
  </div>
)

export default Index