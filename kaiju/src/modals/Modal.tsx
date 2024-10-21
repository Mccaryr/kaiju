import {useSelector} from "react-redux";
import TaskModal from "./TaskModal.tsx";
import {RootState} from '../app/store.ts';
import {closeModal, openModal} from "../features/modalSlice.ts";
import {useDispatch} from "react-redux";
import '../styles/components/Modal.scss'

const Modal = ({ refetch }: { refetch: () => void }) => {
    const {isVisible, modalType, modalProps} = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch();

    if (!isVisible) { return null}

    return (
        <div className='h-[90vh] w-3/4 z-20 rounded-2xl modal'>
            <div className='top-0 right-0 relative'>
                <button
                    onClick={() => dispatch(closeModal())}
                    className='flex items-center justify-center absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8'
                >X
                </button>
            </div>
            <TaskModal modalType={modalType} modalProps={modalProps} refetch={refetch}/>
        </div>
    )
}
export default Modal
