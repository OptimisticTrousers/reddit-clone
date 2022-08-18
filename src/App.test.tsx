// import PremiumCard from "./pages/Home/PremiumCard/PremiumCard";
// import TopCommunitiesCard from "./pages/Home/TopCommunitiesCard/TopCommunitiesCard";
// import PostCreatorCard from "./components/PostCreatorCard/PostCreatorCard";
// import Filter from "./components/Filter/Filter";
// import PersonalHomeCard from "./pages/Home/PersonalHomeCard/PersonalHomeCard";
import Home from "./pages/Home/Home";
import Navbar from "./layouts/Navbar/Navbar";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./pages/Home/Home");

describe("Home", () => {
  test("Should render page header and HomePage on default route", () => {
    const MockedHome = Home as jest.Mock;
    const MockedNavbar = Navbar as jest.Mock;
    MockedNavbar.mockImplementation(() => <div>PageHeaderMock</div>);
    MockedHome.mockImplementation(() => <div>HomePageMock</div>);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("PageHeaderMock")).toBeInTheDocument();
    expect(screen.getByText("HomePageMock")).toBeInTheDocument();
  });
});

// jest.mock("./PremiumCard/PremiumCard");
// jest.mock("./TopCommunitiesCard/TopCommunities");
// jest.mock("../../components/PostCreatorCard/PostCreatorCard");
// jest.mock("../../components/Filter/Filter");
// jest.mock("./PersonalHomeCard/PersonalHomeCard");
