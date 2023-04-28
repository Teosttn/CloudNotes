import myAxios from './axios'

//获取token
const token = localStorage.getItem('token');

//获取笔记数据
export function getNoteContentAPI(currentPage,token){
    return myAxios({
        method:'get',
        url:`/notebooks/page/${currentPage}/7` ,
        headers:{
            'Authorization': `${token}`
        }
      }).then(response=>{
      console.log('获取表格数据成功');
      return response.data.data.records
      }).catch (error=>{
      console.error(error);
      })
}

//获取笔记分类
export function getNoteTypesAPI(token){
    return myAxios({
    method:'get',
    url:'/notebooks/showType',
    headers:{
        'Authorization': ` ${token}`
    }
    }).then(response=>{
        console.log('获取笔记分类成功');
        return response.data.data
      }).catch(error=>{
        console.error(error);
      })
}

//删除笔记类型
export function deleteNoteTypeAPI(params,token){
    return myAxios({
    method:'delete',
    url:'/notebooks/deleteType',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':`${token}`
    },
    params:{
        notebookType:params    
    }
    }).then(response=>{
        console.log('删除笔记分类成功');
        return response
      }).catch(error=>{
        console.error(error);
      })

}

//添加笔记类型
export function addNoteTypeAPI(params,token){
    return myAxios({
    method:'post',
    url:'/notebooks/saveType/',
    params:{
        notebookType:params
    },
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':`${token}`
    }
    }).then(response=>{
        console.log('新建笔记分类成功');
      }).catch(error=>{
        console.error(error);
      })
}

//删除笔记
export function deleteNoteAPI(params,token){
    return myAxios({
        method:'delete',
        url:'/notebooks/delete',
        params:{
            notebookTitle:params
        },
        headers:{
            'Authorization':`${token}`
        }
        }).then(response=>{
            console.log(response);
            console.log('删除笔记成功');
            return response;
          }).catch(error=>{
            console.error(error);
          })
}

//添加笔记
export function addNoteAPI(params,token){
    return myAxios({
        method:'post',
        url:'/notebooks/saveNotebook',
        headers:{
            'Content-Type':'application/json',
            //进行token提交
            'Authorization': ` ${token}`
        },
        //向后端传递新笔记的数据
        data:{
            notebookType:params.classify,
            notebookTitle:params.title,
            notebookState:params.situ,
            notebookContent:params.content,
            notebookDescription:params.description,
        }
        }).then(response=>{
            console.log(response)
            return response
          }).catch(error=>{
            console.error(error);
          })
}

//获取编辑笔记的内容
export function getNotebookAPI(params,token){
    return myAxios({
        method:'get',
        url:`/notebooks/getNotebook` ,
        headers:{
            'Authorization': `${token}`
        },
        params:{
            notebookTitle:params
        }
        }).then(response=>{
            console.log(response);
            return response.data.data;
    
          }).catch(error=>{
            console.error(error);
        })
}

//提交笔记编辑
export function submitEditNoteAPI(params,data,token){
  return myAxios({
    method:'put',
    url:`/notebooks/modifyAll` ,
    headers:{
        'Authorization': `${token}`
    },
    params:{
        notebookTitle:params
    },
    data:{
        notebookTitle:data.title,
        notebookType:data.classify,
        notebookState:parseInt(data.situ),
        notebookDescription:data.description,
        notebookContent:data.content
    }
    }).then(response=>{
      return response;
    }).catch(error=>{
      console.error(error);
    })
}


//批量删除笔记
export function deleteNotesInBatchAPI(params,token){
  return myAxios({
    method:'delete',
    url:`/notebooks/deleteAll`,
    headers:{
      'Authorization': `${token}`
    },
    params:{
      notebookTitle:params
    }
  }).then(response=>{
    return response;
  }).catch(error=>{
    console.error(error);
  })
}

//改变笔记状态
export function changeNotebookStateAPI(title,state,token){
  return myAxios({
    method:'put',
    url:`/notebooks/modifyState`,
    params:{
        notebookTitle:title,
        state:parseInt(state)
    },
    headers:{
      'Authorization': `${token}`,
      'Content-Type':'application/x-www-form-urlencoded'
    }
    }).then(response=>{
        console.log('更改状态成功');
        return response;
    }).catch(error=>{
        console.error(error);
    })
}

//搜索笔记
export function searchNotebookAPI(notebookTitle,currentPage,token){
  return myAxios({
    method:'get',
    url:'/notebooks/getNotebookByTitle',
    headers:{
      'Authorization':`${token}`
    },
    params:{
      notebookTitle:notebookTitle,
      currentPage:currentPage,
      pageSize:7,
    }
  }).then(response=>{
    console.log('搜索成功');
    return response
  }).catch(error=>{
    console.error(error);
  })
}