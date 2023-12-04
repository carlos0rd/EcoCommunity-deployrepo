const express = require("express");
const router = express.Router();

const ROLES = require("../data/roles.constants.json");

const { createPostValidator, idInParams, idenInParams, saveCommentValidator } = require("../validators/post.validators");
const validateFields = require("../validators/index.middleware");

const { authentication, authorization } = require("../middlewares/auth.middlewares");

const postController = require("../controllers/Post.controller");


router.get("/", postController.findAll);

router.get("/own",
authentication,
authorization(ROLES.USER),
postController.findOwn)

router.get("/saved",
authentication,
authorization(ROLES.USER),
postController.findSavedPosts
)

router.get("/user/:identifier",
idenInParams,
validateFields,
postController.findByUser);


router.get("/like/:postId",
authentication,
authorization(ROLES.USER),
postController.findLike);

router.get("/volunteer/:postId",
authentication,
authorization(ROLES.USER),
postController.findParticipants);

router.get("/save/:postId",
authentication,
authorization(ROLES.USER),
postController.isSaved);

router.get("/participant/:postId",
authentication,
authorization(ROLES.USER),
postController.findIsVolunteer);


router.get("/:postId", 
    idInParams, 
    validateFields, 
    postController.findOneById);

router.post(["/", "/:postId"],
    authentication,
    authorization(ROLES.USER),
    createPostValidator, 
    validateFields, 
    postController.save);

router.patch("/like/:identifier",
    authentication,
    authorization(ROLES.USER),
    idenInParams,
    validateFields,
    postController.likeAPost
);

router.patch("/volunteer/:identifier",
    authentication,
    authorization(ROLES.USER),
    postController.volunteerToEvent
);

router.patch("/save/:identifier",
    authentication,
    authorization(ROLES.USER),
    idenInParams,
    validateFields,
    postController.saveAPost
);

router.patch("/comment/:identifier",
    authentication,
    authorization(ROLES.USER),
    idInParams,
    saveCommentValidator,
    validateFields,
    postController.saveComment
)

router.delete("/:postId", 
    authentication,
    authorization(ROLES.USER),
    idInParams, 
    validateFields, 
    postController.deleteById);

module.exports = router;