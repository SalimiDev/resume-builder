import './text-editor.css';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// function undoChange() {
//     this.quill.history.undo();
// }
// function redoChange() {
//     this.quill.history.redo();
// }

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'Inter', 'lucida'];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = (props: string) => ({
    toolbar: {
        container: '#' + props,
        handlers: {
            // undo: undoChange,
            // redo: redoChange
        }
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
});

// Formats objects for setting up the Quill editor
export const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    // 'image',
    'video',
    'color',
    'code-block'
];

// Quill Toolbar component
export const QuillToolbar = (props: { toolbarId: string | undefined }) => {
    return (
        <>
            {props.toolbarId !== undefined && (
                <div id={props.toolbarId}>
                    <span className='ql-formats'>
                        <button className='ql-bold' aria-label='Bold' type='button' />
                        <button className='ql-italic' aria-label='Italic' type='button' />
                        <button className='ql-underline' aria-label='Underline' type='button' />
                        <button className='ql-strike' aria-label='Strikethrough' type='button' />
                    </span>
                    <span className='ql-formats'>
                        <select className='ql-font' aria-label='Font family'>
                            <option value='arial'> Arial </option>
                            <option value='comic-sans'>Comic Sans</option>
                            <option value='courier-new'>Courier New</option>
                            <option value='georgia'>Georgia</option>
                            <option value='helvetica'>Helvetica</option>
                            <option value='Inter' selected>
                                Inter
                            </option>
                            <option value='lucida'>Lucida</option>
                        </select>
                        <select className='ql-size' aria-label='Font size'>
                            <option value='extra-small'>Extra Small</option>
                            <option value='small'>Small</option>
                            <option value='medium' selected>
                                Medium
                            </option>
                            <option value='large'>Large</option>
                        </select>
                        <select className='ql-header' aria-label='Text style'>
                            <option value='1'>Heading 1</option>
                            <option value='2'>Heading 2</option>
                            <option value='3'>Heading 3</option>
                            <option value='4'>Heading 4</option>
                            <option value='5'>Heading 5</option>
                            <option value='6'>Heading 6</option>
                            <option value='' selected>
                                Normal
                            </option>
                        </select>
                    </span>
                    <span className='ql-formats'>
                        <button className='ql-list' value='ordered' aria-label='Ordered list' type='button' />
                        <button className='ql-list' value='bullet' aria-label='Bullet list' type='button' />
                        <button className='ql-indent' value='-1' aria-label='Decrease indent' type='button' />
                        <button className='ql-indent' value='+1' aria-label='Increase indent' type='button' />
                    </span>
                    <span className='ql-formats'>
                        {/* <button className='ql-script' value='super' />
                        <button className='ql-script' value='sub' /> */}
                        <button className='ql-blockquote' aria-label='Blockquote' type='button' />
                        {/* <button className='ql-direction' /> */}
                    </span>
                    <span className='ql-formats'>
                        <select className='ql-align' aria-label='Text alignment' />
                        <select className='ql-color' aria-label='Text color' />
                        {/* <select className='ql-background' /> */}
                    </span>
                    <span className='ql-formats'>
                        <button className='ql-link' aria-label='Insert link' type='button' />
                        {/* <button className='ql-image' />
                        <button className='ql-video' /> */}
                    </span>
                    <span className='ql-formats'>
                        {/* <button className='ql-formula' />
                        <button className='ql-code-block' /> */}
                        <button className='ql-clean' aria-label='Remove formatting' type='button' />
                    </span>
                    <span className='ql-formats'>
                        <button className='ql-undo' aria-label='Undo' type='button'>
                            <CustomUndoIcon />
                        </button>
                        <button className='ql-redo' aria-label='Redo' type='button'>
                            <CustomRedoIcon />
                        </button>
                    </span>
                </div>
            )}
        </>
    );
};
export default QuillToolbar;

const CustomUndoIcon = () => (
    <svg viewBox='0 0 18 18'>
        <polygon className='ql-fill ql-stroke' points='6 10 4 12 2 10 6 10' />
        <path className='ql-stroke' d='M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9' />
    </svg>
);

const CustomRedoIcon = () => (
    <svg viewBox='0 0 18 18'>
        <polygon className='ql-fill ql-stroke' points='12 10 14 12 16 10 12 10' />
        <path className='ql-stroke' d='M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5' />
    </svg>
);
