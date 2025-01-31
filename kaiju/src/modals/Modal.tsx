import {useSelector} from "react-redux";
import TaskModal from "./TaskModal.tsx";
import {RootState} from '../app/store.ts';
import {closeModal} from "../features/modalSlice.ts";
import {useDispatch} from "react-redux";
import '../styles/components/Modal.scss'
import SprintModal from "./SprintModal.tsx";

const Modal = ({ refetch }: { refetch: () => void }) => {
    const {isVisible, modalType, modalProps} = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch();

    if (!isVisible) { return null}

    return (
        <div className='h-[100vh] w-[100vw] z-20 overflow-y-auto modal'>
            <div className='top-0 right-0 relative'>
                <button
                    onClick={() => {
                        dispatch(closeModal())
                        document.body.classList.remove('modal-open');
                    }}
                    className='flex items-center justify-center absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8'
                >X
                </button>
            </div>
            {modalType == "CREATE_TASK" || modalType == "UPDATE_TASK" &&
                <TaskModal modalType={modalType} modalProps={modalProps} refetch={refetch}/>
            }

            {modalType === "SPRINT" &&
                <SprintModal />
            }
        </div>
    )
}
export default Modal
