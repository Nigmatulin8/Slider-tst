$(function (){
	var slider = new Slider({
		images: ".mainImg .photosOne img",
		btnNext: ".mainImg .next",
		btnPrev: ".mainImg .prev",
		btnSlideShow: ".mainImg .slideShow",
		slideShow: false
	});

	var slider1 = new Slider({
		images: ".mainImg1 .photosOne1 img",
		btnNext: ".mainImg1 .next1",
		btnPrev: ".mainImg1 .prev1",
		btnSlideShow: ".mainImg1 .slideShow1",
		slideShow: false,
		slideTime: 1000
	});

	var slider1 = new Slider({
		images: ".mainImg2 .photosOne2 img",
		btnNext: ".mainImg2 .next2",
		btnPrev: ".mainImg2 .prev2",
		btnSlideShow: ".mainImg2 .slideShow2",
		slideShow: false,
		slideTime: 1000
	});

	function Slider(obj) 
	{
		this.images = $(obj.images);

		var slide = this;
		var i = 0;

		this.slideTime = obj.slideTime || 1000;
		this.slShow = obj.slideShow;

		var slideFlag = false;
		this.nextSlide = function () {

			//Защита от дураков
			if(slideFlag) { return; }
			slideFlag = true;

			slide.images.eq(i)
                .animate({"left": -100 + "%"}, 500, function () {
                	slideFlag = false;
                });

			i++;
			if(i >= slide.images.length) { i = 0; }
			slide.images.eq(i).css({"left": 100 + "%", "opacity": "1"})
				.animate({"left": "0"}, 500);
		}

		this.prevSlide = function () {

			//Защита от дураков
			if(slideFlag) { return; }
			slideFlag = true;

			slide.images.eq(i).animate({"left": (100) + "%"}, 500, function () {
                	slideFlag = false;
                }).css({
                    opacity: "1"
                });
			i--;
			if(i < 0) { i = slide.images.length -1; }
			slide.images.eq(i).css({"left": (-100) + "%", "opacity": "1"})
				.animate({"left": "0"}, 500, function () {
                	slideFlag = false;
                });
		}

		this.flagChange = function () {
			if (this.slShow) {
				this.slShow = false;
				$(obj.btnSlideShow).val("Slide Show");
			}

			else {
				this.slShow = true;
				$(obj.btnSlideShow).val("Stop SS");
			}

			if (this.slShow) {
				slide.timerID = setInterval(slide.nextSlide, slide.slideTime);
			}
			else {
				clearTimeout(slide.timerID);
			}
		}

		$(obj.btnNext).on("click", function () { slide.nextSlide(); });
		$(obj.btnPrev).on("click", function () { slide.prevSlide (); });
		$(obj.btnSlideShow).on("click", function () { slide.flagChange(); }); 
	}


	/* To top of page. Begin */
	var $upArrow = $("#toUpId");
	$(window).on("scroll", function () {
		if (window.pageYOffset > 150 || document.documentElement.scrollTop > 150) {
			$upArrow.css("display", "block").on("click", function ()
				{
					$('html, body').animate({
					scrollTop: 0,
				}, 400);
				e.preventDefault(); //Don't works without this. I don't know why (-_-)
			});
		}
		else { $upArrow.css("display", "none") };
	});
	/* To top of page. End */
});