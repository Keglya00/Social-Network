import styleUsers from './Users.module.css'
import User from "./User/User.tsx"
import Paginator from '../Common/Paginator/Paginator.tsx'
import React from 'react'
import { UsersDataType } from '../../redux/usersReducer.ts'
import { Field, Form, Formik } from 'formik'

type PropsType = {
    pagesCount: number,
    currentPage: number,
    usersData: Array<UsersDataType>,
    onUserFollow: (userId: number) => void,
    onUserUnfollow: (userId: number) => void,
    onPageChanged: (page: number) => void,
    onTermChanged: (term: string) => void,
    isFetching: boolean,
    followingInProgress: Array<number>,
    portionsCount: number,
    portionSize: number,
    term: string
}

const Users: React.FC<PropsType> = (props) => {
    let usersElements = props.usersData.map(
            (user) => 
            <li className={styleUsers.users__item}>
                <User key={user.id} id={user.id} name={user.name} status={user.status} avatar={user.photos.small} />
                {user.followed 
                ? <button className={styleUsers.users__button} disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.onUserUnfollow(user.id)}} >unfollow</button> 
                : <button className={styleUsers.users__button} disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.onUserFollow(user.id)}} >follow</button>
                }
            </li>
        
        )

    return(
        <div>
            <div>
                <UserSearchForm onTermChanged={props.onTermChanged} term={props.term}/>
            </div>
            <div className={styleUsers.users}>
                {usersElements}
            </div>
            <div>
                <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={props.portionSize} portionsCount={props.portionsCount} pagesCount={props.pagesCount} />
            </div>
        </div>
    )
}

type FormPropsType = {
    onTermChanged: (term: string) => void
    term: string
}

const UserSearchForm: React.FC<FormPropsType> = (porps) => {

    type FormValuesType = {term: string}
    const submit = (values: FormValuesType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        porps.onTermChanged(values.term)
        setSubmitting(false)
    }

    return (
    <div>
        <Formik
        enableReinitialize={true}
        initialValues={{term: porps.term}}
        onSubmit={submit}>
        {({isSubmitting}) => (
            <Form>
                <Field type='text' name='term' />
                <button type='submit' disabled={isSubmitting}>find</button>
            </Form>
        )}
        </Formik>
    </div>
    )
}

export default Users