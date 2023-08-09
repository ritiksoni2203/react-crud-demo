// ** React Imports
import { Fragment, useEffect, useState } from "react";

// Formik
import { Form, Formik, Field } from "formik";

// Yup
import * as Yup from "yup";

// ** Reactstrap Imports
import {
  Label,
  Button,
  InputGroup,
  InputGroupText,
  Card,
  Row,
  Input,
} from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Third Party Components
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { addStudent, getStudent, updateStudent } from "../../redux/students/slice";
import CustomSpinner from "../../components/customSpinner";
import { useNavigate, useParams } from "react-router-dom";

const MySwal = withReactContent(Swal);

const AddStudent = () => {
  const skin = JSON.parse(localStorage.getItem("skin"));
  const { profile, reload, loading } = useSelector((store) => (store.student));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && dispatch(getStudent(id))
  }, [reload]);
  
  return (
    <Fragment>
      {loading && <CustomSpinner />}
      <Card className="p-3 mt-2">
        <Formik
          enableReinitialize
          initialValues={{
            name: profile.name ?? "",
            address: profile.address ?? "",
            DOB: profile.DOB?.split('T')[0] ?? "",
            email: profile.email ?? "",
            mobile: profile.mobile_no ?? ""
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            address: Yup.string().required("address is required"),
            DOB: Yup.mixed().required("DOB is required").nullable(),
            email: Yup.string().required("Email is required").email('Please enter a valid email address'),
            mobile: Yup.number().required("mobile is required")
          })}
          onSubmit={(values) => {
            MySwal.fire({
              title: "Success!",
              text: id ? "Student updated successfully" : "Student created successfully!",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
                id ? dispatch(updateStudent({ data: values, id })) : dispatch(addStudent({ data: values }));
              }
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleReset,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              <Row>
                <div className="w-full">
                  <div className="mb-1 w-50">
                    <Label className="form-label" for="name">
                      Name
                    </Label>
                    <InputGroup>
                      <Field
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        name="name"
                        onChange={(e) =>
                          setFieldValue("name", e.target.value)
                        }
                      />
                    </InputGroup>
                    {errors.name && touched.name ? (
                      <p className={"text-red-500 mb-0 error-form"}>
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div className="mb-1 w-50">
                    <Label className="form-label" for="address">
                      Address
                    </Label>
                    <InputGroup>
                      <Field
                        className="form-control"
                        id="address"
                        placeholder="Address"
                        name="address"
                        onChange={(e) =>
                          setFieldValue("address", e.target.value)
                        }
                      />
                    </InputGroup>
                    {errors.address && touched.address ? (
                      <p className={"text-red-500 mb-0 error-form"}>
                        {errors.address}
                      </p>
                    ) : null}
                  </div>
                  <div className="mb-1 w-50">
                    <Label className="form-label" for="dob">
                      DOB
                    </Label>
                    <InputGroup>
                      <Field
                        type='date'
                        className="form-control"
                        id="dob"
                        placeholder="DOB"
                        name="DOB"
                        onChange={(e) =>
                          setFieldValue("DOB", e.target.value)
                        }
                      />
                    </InputGroup>
                    {errors.DOB && touched.DOB ? (
                      <p className={"text-red-500 mb-0 error-form"}>
                        {errors.DOB}
                      </p>
                    ) : null}
                  </div>
                  <div className="mb-1 w-50">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <InputGroup>
                      <Field
                        type='email'
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) =>
                          setFieldValue("email", e.target.value)
                        }
                      />
                    </InputGroup>
                    {errors.email && touched.email ? (
                      <p className={"text-red-500 mb-0 error-form"}>
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="mb-1 w-50">
                    <Label className="form-label" for="mobile">
                      Mobile
                    </Label>
                    <InputGroup>
                      <Field
                        className="form-control"
                        id="mobile"
                        placeholder="Mobile"
                        name="mobile"
                        onChange={(e) =>
                          setFieldValue("mobile", e.target.value)
                        }
                      />
                    </InputGroup>
                    {errors.mobile && touched.mobile ? (
                      <p className={"text-red-500 mb-0 error-form"}>
                        {errors.mobile}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex">
                  <div className="relative">
                    <Button
                      color="primary"
                      type="submit"
                      className={
                        loading ? "LoadingContainer1" : "me-1 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                      }
                    >
                      Submit
                    </Button>
                  </div>
                  <Button
                    className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold px-4 py-2 rounded outline-none focus:outline-none ml-2 ease-linear transition-all duration-150"
                    color="secondary"
                    type="button"
                    outline
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    </Fragment>
  );
};

export default AddStudent;
