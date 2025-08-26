import Sidebar from "@/components/Sidebar"
import React from "react"
import Card from "@/components/Cards/Card";


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
    <div className='grid grid-cols-12 min-h-screen gap-6 p-6'>
       <div className='min-h-screen col-span-2'>
          <Sidebar/>
        </div>
        <div className='col-span-10 ml-3'>
          <h1 className='font-bold text-5xl text-amber-200 mb-4'>
            Tags
          </h1>
          <div className='flex flex-wrap gap-4'>
            {tags.map((tag) => (
            <Card key={tag.id} title={tag.name} type="tags" slug={tag.slug}  image={tag.image_background}/>
          ))}
          </div>
          {loading && <p className='text-2xl text-[#E50914] font-bold text-center mt-6'>Loading...</p>}
          
        </div>
    </div>
  )
}

export default Tags