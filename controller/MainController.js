const MailsModel = require("../models/MailsModel");
async function CountData(req,res){
    sessionId = req.session.user;
    var countInbox = await MailsModel.countDocuments({recieverId:sessionId,status:1})
    var countOutbox = await MailsModel.countDocuments({senderId:sessionId,status:1})
    var countTrash = await MailsModel.countDocuments({$or:[{senderId:sessionId},{recieverId:sessionId}],status:-1})
    var countDraft = await MailsModel.countDocuments({senderId:sessionId,status:0}) 

    return [countInbox,countOutbox,countTrash,countDraft];
}

async function Inbox(req,res){
    sessionId = req.session.user;
    [countInbox,countOutbox,countTrash,countDraft] = await CountData(req,res);
    var inboxMail = await MailsModel.find({recieverId:sessionId,status:1}).populate("senderId")
    return res.render("inbox",{"mails":inboxMail,"countInbox":countInbox,"countOutbox":countOutbox,"countTrash":countTrash,"countDraft":countDraft, "name":'inbox', 'session_id':sessionId})
   
}

async function OutBox(req,res){
    sessionId = req.session.user;
    [countInbox,countOutbox,countTrash,countDraft] = await CountData(req,res);
    var inboxMail = await MailsModel.find({senderId:sessionId,status:1}).populate("recieverId")
    return res.render("outbox",{"mails":inboxMail,"countInbox":countInbox,"countOutbox":countOutbox,"countTrash":countTrash,"countDraft":countDraft, "name":'outbox',})
}

module.exports = {
    Inbox,
    // compose,
    OutBox,
    // draft,
    // trash,
    // viewMail,
    // moveToTrash,

}