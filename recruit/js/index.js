// init
MOVE_DELAY = 300;
ANSWER_POINTS = [
  [ // Q0
    [0, 0, 1, 0],
    [5, 3, 0, 4],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ],
  [ // Q1
    [1, 1, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 0, 1],
    [0, 0, 0, 5]
  ],
  [ // Q2
    [13, 3, 0, 5],
    [11, 3, 0, 5],
    [5, 7, 0, 13],
    [0, 0, 2, 0]
  ],
  [ // Q3
    [4, 11, 0, 5],
    [5, 2, 0, 7],
    [9, 3, 0, 3],
    [2, 4, 0, 8]
  ],
  [ // Q4
    [4, 7, 1, 3],
    [5, 3, 2, 4],
    [0, 0, 4, 0],
    [0, 0, 4, 0]
  ]
]
QUESTION_NUM = ANSWER_POINTS.length;
RESULT_PAGES = [
  './result_0.html',
  './result_1.html',
  './result_2.html',
  './result_3.html',
];

points = [0, 0, 0, 0];

(function($){

  function calcScore(answer_points) {
    $.each(answer_points, function(index, point) {
      points[index] += point;
    });
    console.log(points);
  }

  function redirectToResult() {
    var redirect_to = './';
    var max = Math.max(points[0], points[1], points[2], points[3])
    if (max > 0) {
      $.each(points, function(index, point){
        if (point == max) {
          redirect_to = RESULT_PAGES[index];
        }
      })
    }
    location.href = redirect_to;
  }

  $('input').change(function(event) {
    var temp = this.id.split("_");
    var quesId = Number(temp[0]);
    var ansId = Number(temp[1]);
    calcScore(ANSWER_POINTS[quesId][ansId]);

    var nextQuesId = quesId + 1;
    var next = $('#q' + nextQuesId);
    if (!next.length) {
      next = $('#end');
    }
    $('html, body').stop().animate({
      scrollTop: (next.offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
  });

  $('#submit').bind('click', function(event) {
    calcScore();
    redirectToResult();
  });

})(jQuery);