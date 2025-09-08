import Sidebar from "@/components/Sidebar"
import React from "react"
import Card from "@/components/Cards/Card";
import { BounceLoader } from "react-spinners";
import Searchbar from "@/components/Searchbar";

interface Props{
  id: number;
  name: string;
  image_background: string;
  slug: string;
}

const Tags = () => {
  const [page, setPage] = React.useState(1);
  const [hasMore, sethasMore]=React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [tags, setTags] = React.useState<Props[]>([]);

  const fetchtags = async (pageNumber:number) => {
    if(loading) return;
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/tags?key=${import.meta.env.VITE_API_KEY}&page_size=40&page=${pageNumber}`
    );
    const data = await res.json();
    setTags((prev) => [...prev, ...data.results]);
    sethasMore(data.next !== null);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchtags(1);
  }, []);

  React.useEffect(()=>{
    const handleScroll = () => {
      if(window.innerHeight + document.documentElement.scrollTop + 100>= document.documentElement.scrollHeight){
        if(hasMore && !loading){
           setPage((prev) => prev +1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[hasMore, loading])

  React.useEffect(() => {
    if(page >1) fetchtags(page);
  },[page]) 

  return (
    <div className="min-h-screen bg-black">
      {/* Responsive Sidebar */}
      <Sidebar />
      <div className="md:ml-66  md:pt-6 px-2 md:px-6">
        <div className="mb-2">
          <Searchbar/>
        </div>
        <h1 className="font-bold text-3xl md:text-5xl text-amber-200 mb-4">
          Tags
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <Card key={tag.id} title={tag.name} type="tags" slug={tag.slug}  image={tag.image_background}/>
          ))}
        </div>
        {loading && (
          <div className="flex mt-5 justify-center items-center">
            <BounceLoader color="red"/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tags