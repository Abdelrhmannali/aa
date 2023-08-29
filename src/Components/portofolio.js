import Link1 from "../Components/portoflioskills"
import Link2 from "../Components/portofliocolor"

export default function portfilio(){
    return<>
    <div>
        <h1>
            
            <div className="portmain">
            <h2> Portfolio</h2>
            <div className="portofilocategories">
                <Link1 name="WEB APPLICATION" />
                <Link2 name="WEB DESIGN"  />
                <Link1 name="MOBILE APPLICATION" />
                </div>
                <div className="portofilocategories">
                <Link2 name="WEB APPLICATION" />
                <Link1 name="WEB APPLIACTION" />
                 <Link2 name="PWA DEVELPOING" />
                 </div>
            

            </div>
        </h1>
    </div>

    </>
}