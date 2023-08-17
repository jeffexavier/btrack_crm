
import Layout from "@/src/components/nps/Layout.js";
import InternalLayout from "@/src/components/InternalLayout.js";

import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { listNps } from "@/src/backend/utils/nps.js";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import formatDate from "@/src/backend/utils/formatDate.js";
import formatDateToLocaleDateString from "@/src/backend/utils/formatDateToLocaleDateString.js";
import { PencilIcon, TrashIcon } from "@/public/icons.js";
import { DeleteNpsButton } from "@/src/components/nps/DeleteNpsButton.js";
import EditNpsButton from "@/src/components/nps/EditNpsButton.js";

export default function NpsList() {

  const [listedNps, setListedNps] = useState([])


  async function getNpsList() {
    const newListedNps = await listNps()
    setListedNps(newListedNps.value)
  }

  useEffect(() => {
    getNpsList()
  }, [])

  return(
  <InternalLayout>
    <Layout getNpsList={getNpsList}>
      {/* <p>teste</p>
      <Button onPress={() => getNpsList()}>Pegar NPS</Button> */}
      <div className="table w-full rounded-xl overflow-hidden text-sm text-secondary-full">
          <div className="table-header-group table-auto font-semibold bg-secondary-flat">
            <div className="table-row">
              <div className="table-cell p-4">ID</div>
              <div className="table-cell p-4">Data da pesquisa</div>
              <div className="table-cell p-4">Data do registro</div>
              <div className="table-cell p-4">Empresa</div>
              <div className="table-cell p-4">Respondente</div>
              <div className="table-cell p-4">Nota</div>
              <div className="table-cell p-4">Status</div>
              <div className="table-cell p-4"></div>
            </div>
          </div>
          <div className="table-row-group">
            {listedNps.map((item, index) => (
              <div className="table-row bg-[#fff] hover:bg-secondary-flat transition-colors ease-linear">
                <div className="table-cell p-4">{item._id}</div>
                <div className="table-cell p-4">{formatDateToLocaleDateString(item.survey_date)}</div>
                <div className="table-cell p-4">{formatDateToLocaleDateString(item.ref_date)}</div>
                <div className="table-cell p-4">{item.group ? item.group.name_contract : ""}</div>
                <div className="table-cell p-4">{item.contact ? item.contact.name : ""}</div>
                <div className="table-cell p-4">{item.score}</div>
                <div className="table-cell p-4">{item.nps_status}</div>
                <div className="table-cell justify-center place-item-center p-0 self-center align-middle">
                  <div className="flex">
                    <EditNpsButton npsData={item} getNpsList={getNpsList}/>
                    <DeleteNpsButton npsId={item._id} getNpsList={getNpsList}/>
                  </div>
                </div> 
              </div>
              )
            )}
          </div>
      </div>

    </Layout>
  </InternalLayout>
  )
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.authorization;
  try {
    verifyToken(token);
    const verifiedToken = verifyToken(token);
    return {
      props: { userData: verifiedToken },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
}
