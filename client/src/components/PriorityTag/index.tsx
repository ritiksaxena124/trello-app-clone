export default function PriorityTag({title}) {
    let bgColor;
    if(title == "Urgent") {
        bgColor = "bg-[#FF6B6B]"
    } else if(title == "Low") {
        bgColor = "bg-[#0ECC5A]";
    }else{
        bgColor = "bg-[#FFA235]";
    }
    return (
        <div className={`px-4 py-2 text-sm font-medium rounded-md text-white w-fit ${bgColor}`}>
            {title}
          </div>
    );
}