'use client'

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { request } from "../../services/request"

function CourseList (){

    const {data: CoursesData, loading, error} = useQuery({
        queryKey: ['courses'],
        queryFn: request.get('/courses/main').then(res => res.data)
    })
     
    console.log(CoursesData) 




    return (
        <Link 
            href={}
        >
        
        </Link>
    )
}