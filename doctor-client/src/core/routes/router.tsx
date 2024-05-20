import RouteModel from "./RouteModel";
import AppRoutes from "./AppRoutes";
import { ReactElement } from "react";
import { Route } from "react-router-dom";
import ErrorPage from "../components/error-404/ErrorPage";
import LoginPage from "../../modules/login/pages/LoginPage";
import SIgnUp from "../../modules/login/pages/SIgnUp";
import Patients from "../../modules/patients/Patients";
import DicomViewer from "../../modules/dicom-viewer/DicomViewer";



class RouterClass {
  static readonly routes: RouteModel[] = [
    {
      path: AppRoutes.home,
      element: <ErrorPage />,
    },
    {
      path: AppRoutes.login,
      element: <LoginPage />,
    },
    {
      path: AppRoutes.signup,
      element: <SIgnUp />,
    },
    {
      path: AppRoutes.doctor,
      element: <Patients />,
    },
    {
      path: AppRoutes.Error404,
      element: <ErrorPage />,
    },
    {
      path: AppRoutes.dicom,
      element: <DicomViewer />,
    },
  ];

  static getRoutes(): ReactElement[] {
    return RouterClass.routes.map((route: RouteModel) => {
      return RouterClass.handelRoutes(route);
    });
  }

  private static handelRoutes(route: RouteModel): ReactElement {
    // check if route has children
    if (route.children) {
      return (
        // return route with children
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((child: RouteModel) => {
            // check if child has children
            return RouterClass.handelRoutes(child);
          })}
        </Route>
      );
    } else {
      return (
        // return route without children
        <Route key={route.path} path={route.path} element={route.element} />
      );
    }
  }
}

export default RouterClass;
