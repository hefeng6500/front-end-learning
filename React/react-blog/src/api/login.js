import request from '../utils/axios/request.js'

export const login = (data)=>{
  return request({
    method: 'POST',
    url: '/api/login',
    data
  })
}

export const getCode = ()=>{
  return request({
    method: 'GET',
    url: '/api/getCode'
  })
}

export const test = ()=>{
  return request({
    method: 'GET',
    url: '/api'
  })
}