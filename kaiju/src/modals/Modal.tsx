import {useSelector} from "react-redux";
import TaskModal from "./TaskModal.tsx";
import {RootState} from '../app/store.ts';
import {closeModal} from "../features/modalSlice.ts";
import {useDispatch} from "react-redux";

const Modal = () => {
    const {isVisible, modalType, modalProps} = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch();

    if (!isVisible) { return null}

    return (
        <div className='h-[60vh] w-3/4 bg-cyan-900 z-20'>
            {modalType == "CREATE_TASK" && <TaskModal {...modalProps} />}
            <div className='top-0 right-0 relative'>
                <button
                    onClick={() => dispatch(closeModal())}
                    className='flex items-center justify-center absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8'
                >X
                </button>
            </div>
        </div>
    )
}
export default Modal
