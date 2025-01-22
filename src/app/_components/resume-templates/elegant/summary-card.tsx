import { SummaryFormType } from '../../forms/summary/summary-form-schema';
import '../../text-editor/text-editor.css';
import 'react-quill/dist/quill.snow.css';

export default function SummaryCard({ summary }: SummaryFormType) {
    console.log('🚀 ~ ProjectCard ~ summary:', summary);
    if (!summary) return null;

    console.log('summarycard', summary);

    return (
        <div className='flex w-full flex-col gap-2 overflow-hidden'>
            <h2 className='text-lg font-semibold'>SUMMARY</h2>
            <hr className='border' />

            <div className='quill-sidebar-content text-sm'>
                <div className='ql-snow quill-content' dangerouslySetInnerHTML={{ __html: summary || '' }} />
            </div>
        </div>
    );
}
