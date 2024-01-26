import Editor from "@/components/Editor";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const loc = await db.location.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!loc) return notFound();

  return (
    <div className="flex flex-col items-start gp-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Create Post
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            for {params.slug}
          </p>
        </div>
      </div>
      <Editor locationId={loc.id} name={loc.name} />

    </div>
  );
};

export default Page;
