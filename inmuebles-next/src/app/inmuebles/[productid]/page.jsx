import { CardItemComponents , Otro} from "@/components/carditem";
import "./item.css"
export default function CardItem ({params}) {
    const id = params.productid


    return (
        <div style={{height: "250vh", display: "flex", justifyContent: "start", alignItems: "center" , "flexDirection": "column" , alignItems: "center", gap: "5vh"}}>
            <div className="card">
                <CardItemComponents productid={id} />
            </div>
                <Otro productid={id}/>
        </div>
    )
}