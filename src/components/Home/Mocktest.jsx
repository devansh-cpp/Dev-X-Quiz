import { useEffect } from "react";
import MockTestCard from "../../components/UI/MockTestCard";
import { Outlet, Link } from "react-router-dom";

const mockTestData = [
    {
        imageUrl: 'https://raw.githubusercontent.com/Benio101/cpp-logo/master/cpp_logo.png',
        subtitle: "Mock",
        title: "C++ Programming Test",
        category: 'CPP',
        buttonText: "Take Test",
        bgColor: "bg-orange-500",
    },
    {
        imageUrl: 'https://images.credly.com/images/d383e88b-5884-464d-9064-05ad761d0eef/Database_Management_GVSU_Badge.png',
        subtitle: "Mock",
        title: "DBMS Test",
        category: "DBMS",
        buttonText: "Take Test",
        bgColor: "bg-teal-500",
    },
    {
        imageUrl: 'https://cdn-icons-png.freepik.com/512/2172/2172894.png',
        subtitle: "Mock",
        title: "Operating System Test",
        category: "OS",
        buttonText: "Take Test",
        bgColor: "bg-blue-500",
    },
    {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png',
        subtitle: "Mock",
        title: "ReactJS Test",
        category: "ReactJs",
        buttonText: "Take Test",
        bgColor: "bg-purple-400",
    },
    {
        imageUrl: 'https://static.vecteezy.com/system/resources/previews/027/127/463/non_2x/javascript-logo-javascript-icon-transparent-free-png.png',
        subtitle: "Mock",
        title: "JavaScript Test",
        category: "JavaScript",
        buttonText: "Take Test",
        bgColor: "bg-green-900",
    },
    {
        imageUrl: 'https://images.credly.com/images/e4e5214a-e9f3-414c-9ebc-d10467a92816/Data_Structures_and_Algorithms.png',
        subtitle: "Mock",
        title: "Data Structure Test",
        category: "DSA",
        buttonText: "Take Test",
        bgColor: "bg-red-500",
    },
];

export default function MockTest() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        
        <div className="container px-5 py-24 mx-auto">
            
            <h1 className="text-center pb-2 sm:text-4xl text-2xl font-bold font-poppins">
                Explore Varieties of <span className="text-blue-500">Mock Tests</span>
            </h1>
            <p className="text-center  sm:mx-12 text-base">
            Dive into a wide range of mock tests designed to help you assess your knowledge and boost your confidence. Explore various subjects and difficulty levels, track your progress, and identify your strengths and weaknesses. Start your journey towards exam success today!"            
            </p>

            <div className="flex justify-center items-center flex-wrap">
    {mockTestData.map((test, index) => (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={index}>
            <MockTestCard
                imageUrl={test.imageUrl}
                subtitle={test.subtitle}
                title={test.title}
                category={test.category}
                buttonText={test.buttonText}
                bgColor={test.bgColor}
            />
        </div>
    ))}
</div>


        </div>
    );
}
