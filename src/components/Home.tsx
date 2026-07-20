
import NavItems from "./NavItems";

const Home = () => {
    return (
        <div className="container-fluid" >
            <div className="row" >
                <div className="col-md-7 offset-md-4 col-sm-6 offset-sm-1 " >
                    <br />
                    <div className=" text-justify form-background" >

                        <h1 className="book "><b>Fit Nest</b></h1>

                        <h3 className="message">Fit Nest is your dedicated fitness companion, designed to help you reach your health
                            and fitness goals through personalized programs, expert advice, and community support. </h3>
                        <h4 className="messageOne">"Transforming lives, one workout at a time"</h4>
                        <br/>
                        <br/>
                        
                        <ul><NavItems /></ul>
                        
                    </div>
                </div>
            </div>


        </div>
    );
};
export default Home;