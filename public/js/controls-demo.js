$(window).on("load", function () {
    Navigation();
});

function Navigation() {
    $(".input-zones div").click(function (event) {
        newFunction(event);
    });

    $("polygon").click(function (event) {
        newFunction(event);
    });

    function newFunction(event) {
        event.preventDefault();
        if (event.target)
            var selectedScene = `#${event.target.id}.scene-inactive`;

        const animateTime = 1000;

        $(function () {
            $(".scene-active").animate(
                {
                    left: "-100vw",
                },
                animateTime
            );

            $(selectedScene).animate(
                {
                    left: 0,
                },
                animateTime,
                function () {
                    $(".scene-active").remove();
                    $(selectedScene).addClass("scene-active");
                    $(selectedScene).removeClass("scene-inactive");
                    InitSVG();
                }
            );
        });
    }
}
