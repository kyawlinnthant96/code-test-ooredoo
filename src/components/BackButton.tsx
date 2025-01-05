import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const BackButton = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <div
            onClick={goBack}
            className='h-6 w-6 cursor-pointer font-semibold text-white'
        >
            <ArrowLeftIcon className='h-full w-full' />
        </div>
    );
};

export default BackButton;
