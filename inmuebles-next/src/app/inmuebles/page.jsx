
import "./inmuebles.css"
import { SearchBar } from "@/components/searchfilter";
import { CardInmuebles } from "@/components/cardinmuebles";

export default function Inmuebles() {
    return (
        <div className="inmuebles">
            <div className="info">
                <SearchBar  />
            </div>
            <div className="inmuebles-cards">
                <CardInmuebles />
            </div>
        </div>
    );
}