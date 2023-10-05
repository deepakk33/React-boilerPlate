// import BrandLogo from '../../../assets/brandLogo2.svg'
import { clearStorage } from '@app/utils/helpers'
import { ROUTES_CONST } from '@app/routes/routes'
import { useKeycloak } from '@react-keycloak/web'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { AppBar } from '@app/stories'

const PrivateContainerPage = () => {
  const { keycloak } = useKeycloak()
  const [closeProfileMenu, setCloseProfileMenu] = useState(false)
  const navigationItems = [
    {
      to: ROUTES_CONST.ROOT,
      label: 'Frontend',
      external: false,
    },
    {
      to: ROUTES_CONST.PRIVATE,
      label: 'private route',
      external: false,
    },
  ]

  const navItem = (
    <>
      {navigationItems.map((navigationItem) =>
        navigationItem.external ? (
          <a
            key={navigationItem.to}
            href={navigationItem.to}
            className="navLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {navigationItem.label}
          </a>
        ) : (
          <NavLink
            key={navigationItem.to}
            to={navigationItem.to}
            className={({ isActive }) =>
              isActive ? 'navLink active' : 'navLink'
            }
            onClick={() => setCloseProfileMenu(false)}
          >
            {navigationItem.label}
          </NavLink>
        )
      )}
    </>
  )

  const handleLogoutClick = () => {
    clearStorage()
    keycloak.logout({
      redirectUri: `${window.location.origin}/${ROUTES_CONST.AUTH}`,
    })
  }

  const profileItem = (
    <>
      <NavLink
        to={`/${ROUTES_CONST.PRIVATE}/${ROUTES_CONST.PROFILE}`}
        className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}
        onClick={() => setCloseProfileMenu(true)}
      >
        Profile
      </NavLink>

      <button onClick={handleLogoutClick}>Logout</button>
    </>
  )

  return (
    <div>
      <AppBar
        headerTabs={navItem}
        profileMenuTabs={profileItem}
        isAllowProfileMenu={true}
        isCloseProfileMenu={closeProfileMenu}
      >
        <Link to={'/'}>
          <img src={'BrandLogo'} alt="logo" />
        </Link>
      </AppBar>

      <div className="flex h-[calc(100vh-11.4rem)] overflow-hidden">
        <div className="  overflow-y-auto h-full flex-1 bg-[#FAFAFF]">
          <div className="m-[2.5rem]"></div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export { PrivateContainerPage }
