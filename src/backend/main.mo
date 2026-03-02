import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Time "mo:core/Time";

actor {
  type ScoreMode = {
    #logic;
    #emotion;
    #money;
    #growth;
    #brutal;
    #future;
  };

  type RiskLevel = {
    #low;
    #medium;
    #high;
  };

  type CourageLevel = {
    #low;
    #medium;
    #high;
  };

  type ScoreResult = {
    score : Nat;
    riskLevel : RiskLevel;
    courageLevel : CourageLevel;
    insight : Text;
  };

  module ScoreResult {
    public func compare(result1 : ScoreResult, result2 : ScoreResult) : Order.Order {
      Nat.compare(result1.score, result2.score);
    };
  };

  type Question = {
    id : Nat;
    text : Text;
    mode : ScoreMode;
    scoreResult : ScoreResult;
    viewCount : Nat;
    unlockCount : Nat;
    isFeatured : Bool;
    createdAt : Time.Time;
  };

  module Question {
    public func compare(question1 : Question, question2 : Question) : Order.Order {
      Nat.compare(question1.id, question2.id);
    };

    public func compareByViewCount(question1 : Question, question2 : Question) : Order.Order {
      Nat.compare(question2.viewCount, question1.viewCount);
    };

    public func compareByUnlockCount(question1 : Question, question2 : Question) : Order.Order {
      Nat.compare(question2.unlockCount, question1.unlockCount);
    };
  };

  type DeepInsights = {
    hiddenRisks : [Text];
    strengths : [Text];
    yearProjection : Text;
    actionSteps : [Text];
    skillGapWarning : Text;
    brutalTruth : Text;
  };

  let questions = Map.empty<Nat, Question>();
  var nextQuestionId = 1;

  public shared ({ caller }) func submitQuestion(text : Text, mode : ScoreMode) : async Nat {
    let scoreResult : ScoreResult = {
      score = 50;
      riskLevel = #medium;
      courageLevel = #medium;
      insight = "This is a balanced question. Proceed with caution.";
    };

    let question : Question = {
      id = nextQuestionId;
      text;
      mode;
      scoreResult;
      viewCount = 0;
      unlockCount = 0;
      isFeatured = false;
      createdAt = Time.now();
    };

    questions.add(nextQuestionId, question);
    nextQuestionId += 1;
    question.id;
  };

  public shared ({ caller }) func getScoreResult(questionId : Nat) : async ScoreResult {
    let question = getQuestionOrTrap(questionId);
    updateViewCount(questionId);
    question.scoreResult;
  };

  func updateViewCount(questionId : Nat) {
    switch (questions.get(questionId)) {
      case (?question) {
        let updatedQuestion = {
          question with
          viewCount = question.viewCount + 1;
        };
        questions.add(questionId, updatedQuestion);
      };
      case (null) { Runtime.trap("Question not found") };
    };
  };

  public shared ({ caller }) func unlockQuestion(questionId : Nat) : async () {
    switch (questions.get(questionId)) {
      case (?question) {
        let updatedQuestion = {
          question with
          unlockCount = question.unlockCount + 1;
        };
        questions.add(questionId, updatedQuestion);
      };
      case (null) { Runtime.trap("Question not found") };
    };
  };

  public query ({ caller }) func getDeepInsights(questionId : Nat) : async DeepInsights {
    let _ = getQuestionOrTrap(questionId);
    {
      hiddenRisks = [
        "Hidden risk 1",
        "Hidden risk 2",
        "Hidden risk 3",
        "Hidden risk 4",
        "Hidden risk 5",
      ];
      strengths = [
        "Strength 1",
        "Strength 2",
        "Strength 3",
      ];
      yearProjection = "In 1 year, you will see significant growth if you take consistent action.";
      actionSteps = [
        "Action step 1",
        "Action step 2",
        "Action step 3",
      ];
      skillGapWarning = "You need to develop your critical thinking skills.";
      brutalTruth = "Success requires sacrifice and persistence.";
    };
  };

  public shared ({ caller }) func setFeaturedQuestion(questionId : Nat, mode : ScoreMode) : async () {
    let _ = getQuestionOrTrap(questionId);
    let featuredQuestions = questions.values().toArray().filter(
      func(q) { q.mode == mode and q.isFeatured }
    );

    featuredQuestions.forEach(
      func(q) {
        let updatedQuestion = {
          q with isFeatured = false;
        };
        questions.add(q.id, updatedQuestion);
      }
    );

    switch (questions.get(questionId)) {
      case (?question) {
        let updatedQuestion = {
          question with isFeatured = true;
        };
        questions.add(questionId, updatedQuestion);
      };
      case (null) { Runtime.trap("Question not found") };
    };
  };

  public query ({ caller }) func getTopQuestions(limit : Nat) : async [Question] {
    questions.values().toArray().sort(Question.compareByViewCount).sliceToArray(0, limit);
  };

  public query ({ caller }) func getTopQuestionsByUnlocks(limit : Nat) : async [Question] {
    questions.values().toArray().sort(Question.compareByUnlockCount).sliceToArray(0, limit);
  };

  public query ({ caller }) func getFeaturedQuestionByMode(mode : ScoreMode) : async ?Question {
    questions.values().toArray().find(
      func(q) { q.mode == mode and q.isFeatured }
    );
  };

  public query ({ caller }) func getAllQuestions() : async [Question] {
    questions.values().toArray();
  };

  func getQuestionOrTrap(questionId : Nat) : Question {
    switch (questions.get(questionId)) {
      case (null) { Runtime.trap("Question not found") };
      case (?question) { question };
    };
  };
};
