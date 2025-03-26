import { Layout } from './layout'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { IndexPage } from './pages'
import { UserPage } from './pages/user'

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/:id" element={<UserPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
