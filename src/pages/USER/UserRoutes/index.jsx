import { Outlet } from "react-router-dom"
import MainLayout from "src/components/Layout/MainLayout"
import SpinCustom from "src/components/SpinCustom"
import { Roles } from "src/lib/constant"
import ForbiddenPage from "src/pages/ErrorPage/ForbiddenPage"

const UserRoutes = ({ tokenData, loading }) => {


  return (
    <>
      {
        !loading ?
          !!tokenData &&
            ![Roles.ROLE_ADMIN].includes(tokenData?.RoleID) ?
            <MainLayout tokenData={tokenData}>
              <Outlet />
            </MainLayout>
            : <ForbiddenPage />
          :
          <div className="loading-center" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
            <SpinCustom spinning={loading} />
          </div>
      }
    </>
  )
}

export default UserRoutes