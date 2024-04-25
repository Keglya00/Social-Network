import styleUsers from './Users.module.scss'
import searchIcon from '../../images/searchIcon.png'
import User from "./User/User.tsx"
import Paginator from '../Common/Paginator/Paginator.tsx'
import React from 'react'
import { UsersDataType } from '../../redux/usersReducer.ts'
import { Field, Form, Formik } from 'formik'
import { NavLink } from 'react-router-dom'
import MenuButton from '../Common/MenuButton/MenuButton.tsx'

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
            <NavLink to={'/profile/' + user.id} className={styleUsers.users__item}>
                <User key={user.id} id={user.id} name={user.name} status={user.status} avatar={user.photos.small} />
                {user.followed 
                ? <button className={styleUsers.users__button} disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.onUserUnfollow(user.id)}} >unfollow</button> 
                : <button className={styleUsers.users__button} disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.onUserFollow(user.id)}} >follow</button>
                }
            </NavLink>
        )

    return(
        <>
        <MenuButton />
        <div className={styleUsers.users__container}>
            <UserSearchForm onTermChanged={props.onTermChanged} term={props.term}/>
            <div className={styleUsers.users}>
                {usersElements}
                
            </div>
            <div className={styleUsers.paginator}>
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={props.portionSize} portionsCount={props.portionsCount} pagesCount={props.pagesCount} />
            </div>
        </div>
        </>
    )
}

type FormPropsType = {
    onTermChanged: (term: string) => void
    term: string
}

const UserSearchForm: React.FC<FormPropsType> = (props) => {

    type FormValuesType = {term: string}
    const submit = (values: FormValuesType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        props.onTermChanged(values.term)
        setSubmitting(false)
    }

    return (
    <div className={styleUsers.search__container}>
        <Formik
        enableReinitialize={true}
        initialValues={{term: props.term}}
        onSubmit={submit}>
        {({isSubmitting}) => (
            <Form  className={styleUsers.search}>
                <Field className={styleUsers.search__input} onChange={(e) => props.onTermChanged(e.currentTarget.value)} placeholder='search' type='text' name='term' />
                <button className={styleUsers.search__button_container} type='submit' disabled={isSubmitting}><img className={styleUsers.search__button} src={searchIcon}/></button>
            </Form>
        )}
        </Formik>
    </div>
    )
}

export default Users