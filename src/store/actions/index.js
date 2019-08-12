export {
    authentication,
    authLogout,
    setAuthRedirectPath,
    authCheckState,
    signUpSchool,
    updateSchool
} from './authActions';

export {
    getMyTechers,
    updateTeacher,
    setTeacherPassword,
    addTeacher,
    delTeacher,
    setSchoolPassword,
    changePassword
} from './schoolActions';

export {
    getMyStudents,
    updateStudent,
    setStudentPassword,
    addStudent,
    delStudent,
    getMyTasks,
    delTask,
    addTask
} from './teacherActions';

export {
    getMyfees,
    addFees,
    deletingFees,
    feeStatus,
    updatingFeeStatus,
} from './feesActions';

export {
    getAllBook,
    getStudentBooks,
    issueBook,
    addBook,
    updateBook,
    deleteBook
} from './bookActions';


export {
    getStudentPropertyBooks,
    getStudentProppertyFees,
    getStudentProppertyTasks,
} from './studentActions';
