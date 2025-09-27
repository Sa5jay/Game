import Sidebar from "@/components/Sidebar";
import React from "react";
import Card from "@/components/Cards/Card";
import { BounceLoader } from "react-spinners";
import Searchbar from "@/components/Searchbar";

interface Props {
  id: number;
  name: string;
  image_background: string;
  slug: string;
}

const Tags = () => {
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [tags, setTags] = React.useState<Props[]>([]);

  const fetchTags = async (pageNumber: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/tags?key=${
          import.meta.env.VITE_API_KEY
        }&page_size=40&page=${pageNumber}`
      );
      const data = await res.json();
      setTags((prev) => [...prev, ...data.results]);
      setHasMore(data.next !== null);
    } catch (err) {
      console.error("Error fetching tags:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTags(1);
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTags(nextPage);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
  {/* Responsive Sidebar */}
  <Sidebar />
  <div className="md:ml-66 md:pt-6 px-2 md:px-6">
    <div className="mb-2 hidden md:block">
      <Searchbar />
    </div>

    <h1 className="font-bold text-2xl md:text-3xl text-[#E50914] mb-4">
      Tags
    </h1>

    {/* Loader only for initial fetch */}
    {loading && tags.length === 0 ? (
      <div className="flex mt-5 justify-center items-center">
        <BounceLoader color="#E50914" />
      </div>
    ) : (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <Card
              key={tag.id}
              title={tag.name}
              type="tags"
              slug={tag.slug}
              image={tag.image_background}
            />
          ))}
        </div>

        {/* Load More button only after first page has loaded */}
        {hasMore && tags.length > 0 ? (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="py-2 w-full bg-[#E50914] text-lg text-white font-semibold rounded-lg shadow hover:bg-[#b20710] disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        ) : (
          <p className="flex justify-center text-black dark:text-white mt-4">
            No more content..
          </p>
        )}
      </>
    )}
  </div>
</div>

  );
};

export default Tags;
