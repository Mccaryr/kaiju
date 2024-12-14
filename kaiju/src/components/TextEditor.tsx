import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import '../styles/components/TextEditor.scss'

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<Quill | null>(null); // Ref for Quill instance

    useEffect(() => {
        if (editorRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike'], // Add formatting buttons
                        [{ 'color': [] }], // The color dropdown
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image'], // Add links and images
                    ],
                },
            });

            // Set initial content in editor
            if (value) {
                quillInstance.current.root.innerHTML = value;
            }

            // Handle text change
            quillInstance.current.on('text-change', () => {
                const html = quillInstance.current?.root.innerHTML;
                if (html && html !== value) {
                    onChange(html); // Call onChange to update Formik or parent component
                }
            });
        }
    }, [value, onChange]);

    return (
        <div className='text-editor w-[65vw]'>
            <div ref={editorRef} className='bg-gray-800 text-white h-[30vh]'></div>
        </div>
    );
};

export default TextEditor;
