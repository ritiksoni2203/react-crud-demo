// React Imports
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ** Reactstrap Imports
import { Button, Card, CardHeader, CardTitle } from "reactstrap"

import CustomSpinner from "../../components/customSpinner"
import CustomTable from "../../components/table/CustomTable"
import { useDispatch, useSelector } from "react-redux"
import { Edit } from "react-feather"
import { clearStudentProfile, deleteStudent, studentsList } from '../../redux/students/slice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Home = () => {

    const dispatch = useDispatch();
    const { data, loading, reload } = useSelector((store) => store.student);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(studentsList());
        dispatch(clearStudentProfile());
    }, [reload])

    const MySwal = withReactContent(Swal)

    const deleteHandler = (row) => {
        return MySwal.fire({
            title: 'Delete Student',
            text: "Are you sure you want to delete this student?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                confirmButton: 'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded',
                cancelButton: 'text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold px-4 py-2 rounded outline-none focus:outline-none ml-2 ease-linear transition-all duration-150'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteStudent(row.id));
            }
        })
    }

    const ColumnHeaders = () => (
        <>
            <th className="px-5 py-3">No.</th>
            <th className="max-w-[150px] px-5 py-3">Name</th>
            <th className="max-w-[150px] px-5 py-3">Address</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">DOB</th>
            <th className="px-5 py-3">Mobile Number</th>
            <th className="px-5 py-3">Action</th>
        </>
    )

    const DataRows = () => (
        <>
            {data.map((row, index) => (
                <tr key={index} className="even:bg-slate-100 leading-10">
                    <td className="px-5">
                        <p>{index + 1}</p>
                    </td>
                    <td className="max-w-[150px] px-5">{row?.name}</td>
                    <td className="max-w-[150px] px-5">
                        <p className="mb-0">{row?.address}</p>
                    </td>
                    <td className="px-5">
                        {row?.email}
                    </td>
                    <td className="px-5">
                        {row?.mobile_no}
                    </td>
                    <td className="px-5">
                        {row?.DOB.split('T')[0]}
                    </td>
                    <td className="px-5">
                        <div className='flex items-center justify-center gap-2'>
                        <div
                            className="cursor-pointer"
                            onClick={() => deleteHandler(row)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="red"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                            >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                    fillRule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                            </svg>
                        </div>
                        <div
                            className="edit-club"
                            onClick={() => {
                                navigate(`/editstudent/${row.id}`);
                            }}
                        >
                            <Edit color="gray" size={15} />
                        </div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )

    return (
        <>
            {loading && <CustomSpinner />}
            <Card className={`overflow-hidden container app m-auto`}>
                <CardHeader className="flex items-center justify-between mt-5 card-header mb-5">
                    <CardTitle tag="h4" className="text-2xl font-bold">Students List</CardTitle>
            <Button tag={Link} to='/addstudent' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Student</Button>
                </CardHeader>
                <div className="react-dataTable name-width club-table">
                    <CustomTable
                        columnHeaders={<ColumnHeaders />}
                        dataRows={<DataRows />}
                        isPerPageChange={true}
                    />
                </div>
            </Card>
        </>
    )
}

export default Home