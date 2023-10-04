const express=require('express');
const blogController= require('../controller/blogController');
const router=express.Router();
//get blogs:
router.get('/',blogController.blog_index);

router.get('/create',blogController.blog_create);
//post
router.post('/',blogController.blog_create_post);

router.get('/:id',blogController.blog_by_Id);
//delete:
router.delete('/:id',blogController.blog_to_delete);

module.exports=router;