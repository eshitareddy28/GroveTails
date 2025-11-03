   <div className="flex items-center gap-1.5">
              <PawPrint className="w-3 h-3 text-mint-300" />
              <span>{dog.gender}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PawPrint className="w-3 h-3 text-mint-400" />
              <span>{dog.vaccinated ? "Vaccinated" : "Needs shots"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PawPrint className="w-3 h-3 text-mint-500" />
              <span>{dog.trained ? "Trained" : "In training"}</span>
            </div>