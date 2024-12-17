import SchoolInfoManagement from "../../dashboard/page";


const getSchoolInfoById = async (id) => {
    try {
      const res = await fetch(`https://website-sdn-1-sabahbalau.vercel.app/api/dashboard/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch information");
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  export default async function EditDashboard({ params }) {
    const { id } = params;
    console.log("id :", id);
    const { schoolInfo } = await getSchoolInfoById(id);
    const { name, description, stats, facilities, contact, operationalHours } = schoolInfo;
  
    return <SchoolInfoManagement id={id} name={name} description={description} stats={stats} facilities={facilities} contact={contact} operationalHours={operationalHours} />;
  }