'use strict';

angular.module('app.modelFactories',[])
    .factory('UserModel',function(){ return User;})
    .factory('QuestionModel',function(){return Question;})
    .factory('AnswerModel',function(){return Answer;})
    .factory('CommentModel',function(){return Comment;})
    .factory('BadgeModel',function(){return Badge;})
    .factory('TagModel',function(){return Tag;});


function User(){
    this.stats = {
        reputation:0,
        acceptRate:0,
        answerCount:0,
        questionCount:0,
        downvoteCount:0,
        upvoteCount:0,
        viewCount:0,
        badgeCount:{
            bronze:0,
            silver:0,
            gold:0
        }
    };
    this.account = {
        id:0,
        creationDate:'',
        lastLogin:'',
        lastModified:''
    };
    this.id = 0;
    this.name = '';
    this.profileImage = '';
    this.aboutMe = '';
    this.age = 0;
    this.isEmployee = false;
    this.location = '';
    this.websiteUrl = '';
    this.link = '';
}
function Question(){
    this.id=0;
    this.owner = new User();
    this.title='';
    this.body='';
    this.bodyMarkdown='';
    this.comments='';
    this.answers=[];
    this.tags='';
    this.isAnswered=false;
    this.acceptedAnswerId=0;
    
    this.lastEditor='';
    this.bounty={amount:0,closesDate:'',user:''};
    this.closedDetails='';
    this.closedReason='';
    this.notice='';
    
    this.currentUser={
        canClose:false,
        canFlag:false,
        favorited:false,
        upvoted:false,
        downvoted:false};
    
    this.stats = {
        score:0,
        answerCount:0,
        commentCount:0,
        upvoteCount:0,
        viewCount:0,
        favoriteCount:0,
        closeVoteCount:0,
        reopenVoteCount:0,
        deleteVoteCount:0};
    
    this.dates = {
        creationDate: '',
        lastEditDate: '',
        lastActivityDate: '',
        communityOwnedDate: '',
        closedDate: '',
        protectedDate: '',
        lockedDate: ''};
    
    this.getBodyPreview = function(numChars){
        return this.body.substr(0,numChars);
    };
    this.getBodyPreviewAtNewline = function(maxChars){
        var firstNl = this.body.indexOf('\n');
        var length = firstNl;
        if(firstNl > maxChars || firstNl === -1) length = maxChars;
        return this.body.substr(0,length);
    };
}
function Answer(){
    this.id=0;
    this.title='';
    this.body='';
    this.bodyMarkdown='';
    this.comments=[];
    this.isAccepted=false;
    this.owner=new User();
    this.questionId=0;
    this.tags=[];
    this.lastEditor=new User();
    this.awardedBounty={amount:0,users:[]};
    
    this.currentUser={
        accepted:false, 
        canFlag:false, 
        downvoted:false, 
        upvoted:false};

    this.stats = {
        score:0, 
        commentCount:0, 
        downvoteCount:0, 
        upvoteCount:0};
    
    this.dates = {
        communityOwnedDate:'',
        creationDate:'',
        lastActivityDate:'',
        lastEditDate:'',
        lockedDate:''};
}
function Comment(){
    this.id=0;
    this.body='';
    this.bodyMarkdown='';
    this.owner=new User();
    this.score=0;
    this.postId=0;
    this.edited=false;
    this.postType='';
    this.replyToUser='';

    this.creationDate='';

    this.currentUser={
        canFlag:false,
        upvoted:false};
}
function Badge(){
    this.id=0;
    this.description='';
    this.type='named';// named/tag_based
    this.awardCount=0;
    this.name='';
    this.rank='';// gold/bronze/ilver
    this.user='';
}
function Tag(){
    this.count=0;
    this.hasSynonyms=false;
    this.moderatorOnly=false;
    this.required=false;
    this.lastActivityDate='';
    this.name='';
    this.synonyms=[];
    this.userId=0;
}