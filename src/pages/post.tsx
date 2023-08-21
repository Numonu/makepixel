import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/molecules/Modal";

export default function Post(){

    const {post} = useParams();
    const navigate = useNavigate();

    return <Modal onClose={() => navigate("/")}>
        <h1>Beibi la vida es un ciclo</h1>
        <h1>{post}</h1>
    </Modal>
}