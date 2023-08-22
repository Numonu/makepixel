import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../global/components/molecules/Modal";

export default function Post(){

    const {post} = useParams();
    const navigate = useNavigate();

    return <Modal onClose={() => navigate("/")}>
        <h1>Mockup</h1>
        <h1>{post}</h1>
    </Modal>
}